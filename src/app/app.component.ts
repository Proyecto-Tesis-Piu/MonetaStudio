import { Component, ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Savio';
  showFiller = false;
  openSidenav = false;

  constructor(){
  }

}
