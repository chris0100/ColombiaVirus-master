import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import {AuthService} from './auth.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup;
  datosCorrectos = true;
  textoError = '';

  constructor(private creadorFormulario: FormBuilder, private auth: AngularFireAuth,
              private spinner: NgxSpinnerService, private authService: AuthService, private router: Router) { }


  ngOnInit(): void {

    // Revisa si el usuario esta autenticado, para redireccionar
    if (this.authService.isAuthenticated()) {
      swal.fire('Acceso invalido', `Hola ${this.authService.usuario.nombre}, ya te encuentras logueado`, 'info');
      this.router.navigate(['/listado-medicos']);
    }

    this.formularioLogin = this.creadorFormulario.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    });
  }

  ingresar(): void
  {
    if (this.formularioLogin.valid)
    {
      this.datosCorrectos = true;
      this.spinner.show();

      this.authService.login(this.formularioLogin.value.email, this.formularioLogin.value.password).subscribe(
        response => {

          // Guardar el usuario
          this.authService.guardarUsuario(response.access_token);

          // Guardar el token
          this.authService.guardarToken(response.access_token);

          // Se crea la variable usuario
          const usuario = this.authService.usuario;

          this.spinner.hide();

          // Redirecciona con mensaje de exito
          this.router.navigate(['/listado-medicos']);
          swal.fire('Login', `Hola ${usuario.username}, has iniciado sesion con exito!`, 'success');
        },
        error => {
          if (error.status === 400) {
            swal.fire('Error Login', 'Username o password incorrectos', 'error');
            this.datosCorrectos = false;
            this.textoError = error.message;
            this.spinner.hide();
          }
        }
      );



    }
    else{
      this.datosCorrectos = false;
      this.textoError = 'Por favor revisa que los datos sean correctos';
    }
  }
}
