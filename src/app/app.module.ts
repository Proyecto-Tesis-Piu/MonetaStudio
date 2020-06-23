import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './Components/Shared/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { AppComponent } from './app.component';
import { CrearUsuarioComponent } from './Components/crear-usuario/crear-usuario.component';
import { IniciarSesionComponent } from './Components/iniciar-sesion/iniciar-sesion.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CrearUsuarioComponent,
    IniciarSesionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
