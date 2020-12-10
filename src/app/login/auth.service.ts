import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from './usuario';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // tslint:disable-next-line:variable-name
  private _usuario: Usuario;
  // tslint:disable-next-line:variable-name
  private _token: string;

  constructor(private http: HttpClient) { }

  // Metodos get y set
  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    }
    // Si el usuario es nulo pero existe en el sessionstorage
    else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    }
    // Si el usuario es nulo pero existe en el sessionstorage
    else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }


  // Se realiza el login del usuario
  login(email: string, password: string): Observable<any> {
    const urlEndPoint = 'http://localhost:8082/oauth/token';

    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credenciales
    });

    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', email);
    params.set('password', password);
    console.log(params.toString());

    return this.http.post<any>(urlEndPoint, params.toString(), {headers: httpHeaders});
  }


  // Se guarda el usuario
  guardarUsuario(accessToken: string): void {
    const objPayload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.nombre = objPayload.nombre;
    this._usuario.apellido = objPayload.apellido;
    this._usuario.email = objPayload.email;
    this._usuario.username = objPayload.user_name;
    this._usuario.roles = objPayload.authorities;
    this._usuario.edad = objPayload.edad;
    this._usuario.cedula = objPayload.cedula;
    this._usuario.tipo = objPayload.tipo;
    this._usuario.telefono = objPayload.telefono;


    // Se guarda en el session como un string
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }


  // Se guarda el token
  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }


  // Obtener los datos del token
  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  // Revisa si el usuario ya esta autenticado
  isAuthenticated(): boolean {
    const objPayload = this.obtenerDatosToken(this.token);
    return objPayload != null && objPayload.user_name.length > 0;
  }


  // Cierra la sesion limpiando los datos del token y del session storage.
  logout(): void {
    this._token = null;
    this._usuario = null;

    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }



  // Revisa si el usuario tiene un rol incluido.
  hasRole(role: string): boolean{
    if (this.usuario.roles.includes(role)){
      return true;
    }
    return false;
  }
}
