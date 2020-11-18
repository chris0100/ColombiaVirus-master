import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import swal from "sweetalert2";
import {AuthService} from '../login/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html'
})


export class EncabezadoComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  // Cerrar la sesion
  logout(): void {
    swal.fire('Hasta Pronto', `${this.authService.usuario.nombre}, has cerrado sesión correctamente. Gracias por usar nuestros servicios`, 'success');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
