import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  countryArray:any[] = [];

  constructor( private http: HttpClient) { 

    this.http.get('http://localhost:49755/api/Country')
        .subscribe((countries:any) =>{
          this.countryArray = countries;
        })

  }

  ngOnInit(): void {
  }

  guardar(){
    console.log("Jala")
  }
}
