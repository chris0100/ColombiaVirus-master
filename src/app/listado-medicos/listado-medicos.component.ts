import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from "sweetalert2";
import {UsuarioService} from '../login/usuario.service';

@Component({
  selector: 'app-listado-medicos',
  templateUrl: './listado-medicos.component.html',
  styleUrls: ['./listado-medicos.component.scss']
})
export class ListadoMedicosComponent implements OnInit {
  medicos: any[] = new Array<any>();
  constructor(private dbM: AngularFirestore, private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    this.medicos.length = 0;
    this.recargarUsuariosMedicos();

  }

  recargarUsuariosMedicos(): void {
    this.usuarioService.listOfUsersDr().subscribe(
      obj => {
        console.log(obj);
        this.medicos = obj;
      });
  }



  desactivar(id: number): void {
    // desactiva al medico
    console.log('se quiere desactivar al siguiente medico: ' + id);
    this.usuarioService.togglePaciente(id).subscribe(
      obj => {
        console.log(obj);
        this.recargarUsuariosMedicos();
        Swal.fire({
          title: 'Desactivado!',
          text: 'Se desactivo correctamente al usuario: ' + obj.nombre,
          icon: 'success'
        });
      }
    );
  }


  activar(id: number): void {
    // activa el medico
    console.log('se quiere activar al siguiente medico: ' + id);
    this.usuarioService.togglePaciente(id).subscribe(
      obj => {
        console.log(obj);
        this.recargarUsuariosMedicos();
        Swal.fire({
          title: 'Activado!',
          text: 'Se activo correctamente al usuario: ' + obj.nombre,
          icon: 'success'
        });
      }
    );
  }

}
