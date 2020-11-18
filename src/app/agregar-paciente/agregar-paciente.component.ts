import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html'
})


export class AgregarPacienteComponent implements OnInit {
  formularioPaciente: FormGroup;
  porcentajeSubida = 0;
  urlImagen = '';
  esEditable = false;
  id: string;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private activeRoute: ActivatedRoute)
    { }


  ngOnInit(): void {

    this.formularioPaciente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      cedula: [''],
      fechaNacimiento: ['', Validators.required],
      telefono: [''],
      imgURL: ['', Validators.required]
    });

    this.id = this.activeRoute.snapshot.params.pacienteID;
    if (this.id !== undefined)
    {
      this.esEditable = true;

      this.db.doc<any>('pacientes' + '/' + this.id).valueChanges().subscribe((paciente) => {
        this.formularioPaciente.setValue({
          nombre : paciente.nombre,
          apellido: paciente.apellido,
          correo: paciente.correo,
          cedula: paciente.cedula,
          fechaNacimiento: new Date(paciente.fechaNacimiento.seconds * 1000).toISOString().substr(0, 10),
          telefono: paciente.telefono,
          imgURL: ''
        });


        this.urlImagen = paciente.imgURL;
      });
    }


  }


  agregar(): void
  {
    this.formularioPaciente.value.imgURL = this.urlImagen
    this.formularioPaciente.value.fechaNacimiento = new Date(this.formularioPaciente.value.fechaNacimiento)
    console.log(this.formularioPaciente.value)
    this.db.collection('pacientes').add(this.formularioPaciente.value).then((termino)=>{
      Swal.fire({
        title: 'Agregado!',
        text: 'Se agrego correctamente',
        icon: 'success'
      });
    });
  }

  editar(): void
  {
    this.formularioPaciente.value.imgURL = this.urlImagen;
    this.formularioPaciente.value.fechaNacimiento = new Date(this.formularioPaciente.value.fechaNacimiento);

    this.db.doc('pacientes/'+this.id).update(this.formularioPaciente.value).then(()=>{
      Swal.fire({
        title: 'Editado!',
        text: 'Se editó correctamente',
        icon: 'success'
      });
    }).catch(() => {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al actualizar el cliente',
        icon: 'error'
      });
    });
  }

  subirImagen(evento)
  {
    if(evento.target.files.length > 0)
    {
      let nombre = new Date().getTime().toString()
      let archivo = evento.target.files[0]
      let extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'))
      let ruta = 'pacientes/' + nombre + extension;
      const referencia = this.storage.ref(ruta)
      const tarea = referencia.put(archivo)
      tarea.then((objeto)=>{
        console.log('imagen subida')
        referencia.getDownloadURL().subscribe((url)=>{
          this.urlImagen = url;
        })
      })
      tarea.percentageChanges().subscribe((porcentaje)=>{
        this.porcentajeSubida = parseInt(porcentaje.toString());
      })
    }


  }


}
