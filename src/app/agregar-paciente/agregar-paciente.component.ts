import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Usuario} from '../login/usuario';
import {UsuarioService} from '../login/usuario.service';

@Component({
  selector: 'app-agregar-paciente',
  templateUrl: './agregar-paciente.component.html'
})


export class AgregarPacienteComponent implements OnInit {
  formularioPaciente: FormGroup;
  porcentajeSubida = 0;
  urlImagen = '';
  esEditable = false;
  id: number;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router) {
  }


  ngOnInit(): void {

    this.formularioPaciente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      cedula: [''],
      edad: ['', Validators.required],
      telefono: ['']
    });

    this.id = this.activeRoute.snapshot.params.pacienteID;
    console.log('este el id: ' + this.id);

    // si no viene con una ruta definida, entonces se realiza lo siguiente.
    if (this.id !== undefined) {
      this.esEditable = true;

      this.usuarioService.findUser(this.id).subscribe(
        obj => {
          console.log(obj);
          this.formularioPaciente.setValue({
            nombre: obj.nombre,
            apellido: obj.apellido,
            email: obj.email,
            cedula: obj.cedula,
            telefono: obj.telefono,
            edad: obj.edad
          });
        });
    }
  }


  agregar(): void {
    console.log('add pacient');

    console.log(this.formularioPaciente.value);
    const usuario = new Usuario();
    usuario.apellido = this.formularioPaciente.value.apellido;
    usuario.cedula = this.formularioPaciente.value.cedula;
    usuario.edad = this.formularioPaciente.value.edad;
    usuario.email = this.formularioPaciente.value.email;
    usuario.nombre = this.formularioPaciente.value.nombre;
    usuario.password = this.formularioPaciente.value.cedula;
    usuario.username = this.formularioPaciente.value.email;
    usuario.roles = ['ROLE_USER'];
    usuario.tipo = 'paciente';
    usuario.telefono = this.formularioPaciente.value.telefono;

    this.usuarioService.create(usuario).subscribe(obj => {
      Swal.fire({
        title: 'Agregado!',
        text: 'Se agrego correctamente al usuario: ' + usuario.nombre,
        icon: 'success'
      });

      // redireccionar
      this.router.navigate(['/listado-pacientes']);
    });
  }


  editar(): void {
    console.log('add pacient');

    console.log(this.formularioPaciente.value);
    const usuario = new Usuario();
    usuario.apellido = this.formularioPaciente.value.apellido;
    usuario.cedula = this.formularioPaciente.value.cedula;
    usuario.edad = this.formularioPaciente.value.edad;
    usuario.email = this.formularioPaciente.value.email;
    usuario.nombre = this.formularioPaciente.value.nombre;
    usuario.password = this.formularioPaciente.value.cedula;
    usuario.username = this.formularioPaciente.value.email;
    usuario.roles = ['ROLE_USER'];
    usuario.tipo = 'paciente';
    usuario.telefono = this.formularioPaciente.value.telefono;
    usuario.id = this.id;

    this.usuarioService.create(usuario).subscribe(obj => {
      Swal.fire({
        title: 'Editado!',
        text: 'Se edito correctamente al usuario: ' + usuario.nombre,
        icon: 'success'
      });

      // redireccionar
      this.router.navigate(['/listado-pacientes']);
    });
  }


}
