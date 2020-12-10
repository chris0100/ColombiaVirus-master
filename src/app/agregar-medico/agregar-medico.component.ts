import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2'
import {UsuarioService} from '../login/usuario.service';
import {Usuario} from '../login/usuario';

@Component({
  selector: 'app-agregar-medico',
  templateUrl: './agregar-medico.component.html',
  styleUrls: ['./agregar-medico.component.scss']
})
export class AgregarMedicoComponent implements OnInit {
  formularioMedico: FormGroup;
  porcentajeSubida: number = 0;
  urlImagen = '';
  esEditable = false;
  id: number;

  constructor(
    private fbM: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService)
    { }

  ngOnInit(): void {

    this.formularioMedico = this.fbM.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      cedula: [''],
      edad: ['', Validators.required],
      telefono: ['']
    });

    this.id = this.activeRoute.snapshot.params.medicoID;

    if (this.id != undefined)
    {
      this.esEditable = true;
      this.usuarioService.findUser(this.id).subscribe(
        obj => {
        console.log(obj);

        this.formularioMedico.setValue({
          nombre: obj.nombre,
          apellido: obj.apellido,
          email: obj.email,
          edad: obj.edad,
          telefono: obj.telefono,
          cedula: obj.cedula
        });
      });


    }

  }

  agregar(): void {
    console.log('add pacient');

    console.log(this.formularioMedico.value);
    const usuario = new Usuario();
    usuario.apellido = this.formularioMedico.value.apellido;
    usuario.cedula = this.formularioMedico.value.cedula;
    usuario.edad = this.formularioMedico.value.edad;
    usuario.email = this.formularioMedico.value.email;
    usuario.nombre = this.formularioMedico.value.nombre;
    usuario.password = this.formularioMedico.value.cedula;
    usuario.username = this.formularioMedico.value.email;
    usuario.roles = ['ROLE_ADMIN'];
    usuario.tipo = 'doctor';
    usuario.telefono = this.formularioMedico.value.telefono;

    this.usuarioService.create(usuario).subscribe(obj => {
      Swal.fire({
        title: 'Agregado!',
        text: 'Se agrego correctamente al usuario: ' + usuario.nombre,
        icon: 'success'
      });

      // redireccionar
      this.router.navigate(['/listado-medicos']);
    });
  }

  editar(): void {
    console.log('add pacient');

    console.log(this.formularioMedico.value);
    const usuario = new Usuario();
    usuario.apellido = this.formularioMedico.value.apellido;
    usuario.cedula = this.formularioMedico.value.cedula;
    usuario.edad = this.formularioMedico.value.edad;
    usuario.email = this.formularioMedico.value.email;
    usuario.nombre = this.formularioMedico.value.nombre;
    usuario.password = this.formularioMedico.value.cedula;
    usuario.username = this.formularioMedico.value.email;
    usuario.roles = ['ROLE_ADMIN'];
    usuario.tipo = 'doctor';
    usuario.telefono = this.formularioMedico.value.telefono;
    usuario.id = this.id;

    this.usuarioService.create(usuario).subscribe(obj => {
      Swal.fire({
        title: 'Editado!',
        text: 'Se edito correctamente al usuario: ' + usuario.nombre,
        icon: 'success'
      });

      // redireccionar
      this.router.navigate(['/listado-medicos']);
    });
  }


}
