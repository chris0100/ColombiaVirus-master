import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {UsuarioService} from '../login/usuario.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.scss']
})
export class ListadoPacientesComponent implements OnInit {
  pacientes: any[] = new Array<any>();
  constructor(private firestore: AngularFirestore, private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    this.pacientes.length = 0;
    this.recargarUsuariosPacientes();
  }

  recargarUsuariosPacientes(): void {
    this.usuarioService.listOfUsers().subscribe(
      obj => {
        console.log(obj);
        this.pacientes = obj;
      }
    );
  }



  desactivar(id: number): void {
    // desactiva al paciente
    console.log('se quiere desactivar al siguiente paciente: ' + id);
    this.usuarioService.togglePaciente(id).subscribe(
      obj => {
        console.log(obj);
        this.recargarUsuariosPacientes();
        Swal.fire({
          title: 'Desactivado!',
          text: 'Se desactivo correctamente al usuario: ' + obj.nombre,
          icon: 'success'
        });
      }
    );
  }


  activar(id: number): void {
    // activa el paciente
    console.log('se quiere activar al siguiente paciente: ' + id);
    this.usuarioService.togglePaciente(id).subscribe(
      obj => {
        console.log(obj);
        this.recargarUsuariosPacientes();
        Swal.fire({
          title: 'Activado!',
          text: 'Se activo correctamente al usuario: ' + obj.nombre,
          icon: 'success'
        });
      }
    );
  }

}
