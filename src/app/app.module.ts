import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ListadoPacientesComponent } from './listado-pacientes/listado-pacientes.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AgregarPacienteComponent } from './agregar-paciente/agregar-paciente.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ListadoMedicosComponent } from './listado-medicos/listado-medicos.component';
import { AgregarMedicoComponent } from './agregar-medico/agregar-medico.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import localeES from '@angular/common/locales/es';
import {AuthInterceptor} from './login/interceptors/auth.interceptor';
import {TokenInterceptor} from './login/interceptors/token.interceptor';
import { ChatComponent } from './chat/chat.component';
import { MapaComponent } from './mapa/mapa.component';
import {GoogleMapsModule} from '@angular/google-maps';



registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EncabezadoComponent,
    ListadoPacientesComponent,
    AgregarPacienteComponent,
    ListadoMedicosComponent,
    AgregarMedicoComponent,
    ChatComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
    AngularFireStorageModule,
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
