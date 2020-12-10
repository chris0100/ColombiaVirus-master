import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from './usuario';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint = 'http://localhost:8082/api/usuarios';

  constructor(private http: HttpClient, private router: Router) { }


  // Create a user
  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlEndPoint, usuario).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/listado-pacientes']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // list of users(pacient)
  listOfUsers(): Observable<Usuario[]> {
    const urlEndPoint = this.urlEndPoint + '/pacientes';
    return this.http.get<Usuario[]>(`${urlEndPoint}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/listado-pacientes']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // List of users(Doctor)
  listOfUsersDr(): Observable<Usuario[]> {
    const urlEndPoint = this.urlEndPoint + '/doctores';
    return this.http.get<Usuario[]>(`${urlEndPoint}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/listado-medicos']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }


  // find a pacient
  findUser(id: number): Observable<Usuario>{
    const urlEndPoint = this.urlEndPoint + '/pacdoc';
    return this.http.get<Usuario>(`${urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje){
          this.router.navigate(['/listado-pacientes']);
        }
        return throwError(e);
      })
    );
  }


  // activate and deactivate a user
  togglePaciente(id: number): Observable<Usuario>{
    const urlEndPoint = this.urlEndPoint + '/pacientes/toggle';
    return this.http.get<Usuario>(`${urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje){
          this.router.navigate(['/listado-pacientes']);
        }
        return throwError(e);
      })
    );
  }





}
