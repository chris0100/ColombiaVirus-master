import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarMedicoComponent } from './agregar-medico/agregar-medico.component';
import { AgregarPacienteComponent } from './agregar-paciente/agregar-paciente.component';
import { ListadoMedicosComponent } from './listado-medicos/listado-medicos.component';
import { ListadoPacientesComponent } from './listado-pacientes/listado-pacientes.component';
import {LoginComponent} from './login/login.component';
import {RoleGuard} from './login/guards/role.guard';
import {AuthGuard} from './login/guards/auth.guard';
import {ChatComponent} from './chat/chat.component';
import {MapaComponent} from './mapa/mapa.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'mapa', component: MapaComponent, canActivate: [RoleGuard, AuthGuard], data: {roles: ['ROLE_ADMIN', 'ROLE_USER']}},
  {path: 'listado-medicos', component: ListadoMedicosComponent, canActivate: [RoleGuard, AuthGuard], data: {roles: ['ROLE_ADMIN', 'ROLE_USER']}},
  {path: 'agregar-medico', component: AgregarMedicoComponent, canActivate: [RoleGuard, AuthGuard], data: {roles: ['ROLE_ADMIN', 'ROLE_USER']}},
  {path: 'agregar-medico/:medicoID', component: AgregarMedicoComponent, canActivate: [RoleGuard, AuthGuard], data: {roles: ['ROLE_ADMIN', 'ROLE_USER']}},
  {path: 'listado-pacientes', component: ListadoPacientesComponent, canActivate: [RoleGuard, AuthGuard], data: {roles: ['ROLE_ADMIN', 'ROLE_USER']}},
  {path: 'agregar-paciente', component: AgregarPacienteComponent, canActivate: [RoleGuard, AuthGuard], data: {roles: ['ROLE_ADMIN', 'ROLE_USER']}},
  {path: 'agregar-paciente/:pacienteID', component: AgregarPacienteComponent, canActivate: [RoleGuard, AuthGuard], data: {roles: ['ROLE_ADMIN', 'ROLE_USER']}},
  { path: 'chat', component: ChatComponent, canActivate: [RoleGuard, AuthGuard], data: {roles: ['ROLE_ADMIN', 'ROLE_USER']}}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
