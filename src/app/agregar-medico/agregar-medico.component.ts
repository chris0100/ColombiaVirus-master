import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-medico',
  templateUrl: './agregar-medico.component.html',
  styleUrls: ['./agregar-medico.component.scss']
})
export class AgregarMedicoComponent implements OnInit {
  formularioMedico: FormGroup;
  porcentajeSubida: number = 0;
  urlImagen: string = ''
  esEditable: boolean = false;
  id: string;
  constructor(
    private fbM: FormBuilder, 
    private storage: AngularFireStorage, 
    private db: AngularFirestore,
    private activeRoute: ActivatedRoute)
    { }

  ngOnInit(): void {

    this.formularioMedico = this.fbM.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo:['', Validators.compose([
        Validators.required, Validators.email
      ])],
      cedula:[''],
      edad: ['', Validators.required],
      telefono: [''],
      imgURL: ['', Validators.required]
    })

    this.id = this.activeRoute.snapshot.params.medicoID; 

    if(this.id != undefined)
    {
      this.esEditable = true;
      this.db.doc<any>('medicos'+'/'+this.id).valueChanges().subscribe((medico)=>{
        console.log(medico)
        this.formularioMedico.setValue({
          nombre: medico.nombre,
          apellido: medico.apellido,
          correo: medico.correo,
          edad: medico.edad,
          telefono: medico.telefono,
          cedula: medico.cedula,
          imgURL: ''
        })
  
        this.urlImagen = medico.imgURL;
      });


    }

  }

  agregar()
  {
    this.formularioMedico.value.imgURL = this.urlImagen
    console.log(this.formularioMedico.value)
    this.db.collection('medicos').add(this.formularioMedico.value).then((termino)=>{
      Swal.fire({
        title: 'Agregado!',
        text: 'Se agrego correctamente',
        icon: 'success'
      })
    })
  }

  editar()
  {
    this.formularioMedico.value.imgURL = this.urlImagen
    
    this.db.doc('medicos/'+this.id).update(this.formularioMedico.value).then(()=>{
      Swal.fire({
        title: 'Editado!',
        text: 'Se editó correctamente',
        icon: 'success'
      })
    }).catch(()=>{
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error',
        icon: 'error'
      })
    })

  }

  subirImagenD(evento)
  {
    if(evento.target.files.length > 0)
    {
      let nombre = new Date().getTime().toString()
      let archivo = evento.target.files[0]
      let extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'))
      let ruta ='medicos/'+nombre+extension;
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
