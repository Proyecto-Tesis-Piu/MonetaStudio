import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './Components/home/home.component'
import {CrearUsuarioComponent} from './Components/Usuarios/crear-usuario/crear-usuario.component'
import {IniciarSesionComponent} from './Components/Usuarios/iniciar-sesion/iniciar-sesion.component'
const routes: Routes = [
  {path:'home', component:HomeComponent },
  {path:'crearusuario', component:CrearUsuarioComponent },
  {path:'iniciarsesion', component:IniciarSesionComponent },
  {path:'**',pathMatch: 'full',redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
