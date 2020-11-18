import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, private router: Router) {
  }

  // El guarda esta atento antes de que se vaya a dirigir a la ruta del enlace
  // @ts-ignore
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Revisa que el usuario este autenticado
    if (this.authService.isAuthenticated()) {

      // Obtiene la posicion del tipo de rol del usuario autenticado
     // const tipologin = this.authService.usuario.roles.findIndex(obj => obj === 'ROLE_ADMIN');

      // Revisa si ha expirado el token
      if (this.isTokenExpirado()) {
        this.authService.logout();
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }


    // Si el usuario no esta autenticado, redirecciona a la ventana de login
    this.router.navigate(['/login']);
    return false;
  }


  // Metodo de revision de expiracion del token
  isTokenExpirado(): boolean {
    const token = this.authService.token;
    const objPayload = this.authService.obtenerDatosToken(token);
    const now = new Date().getTime() / 1000; // fecha actual en segundos.

    // Si la fecha es menor, significa que aun esta vencido, de lo contrario retorna false.
    if (objPayload.exp < now) {
      return true;
    }
    return false;
  }

}
