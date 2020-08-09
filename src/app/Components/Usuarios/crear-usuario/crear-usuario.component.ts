import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../usuario.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  response:any;
  countryArray:any[] = [];
  UserForm:FormGroup;
  user:User;

  constructor( private http: HttpClient) { 
    this.user = new User();
    this.UserForm = new FormGroup({
      formUserName: new FormControl(''),
      formUserLName: new FormControl(''),
      formCountrySelect: new FormControl(''),
      formStateSelect: new FormControl(''),
      formAge: new FormControl(''),
      userEmail: new FormControl(''),
      password: new FormControl('')
    });
    

  }

  ngOnInit(): void {
    
    this.http.get('http://localhost:49755/api/Country')
        .subscribe((countries:any) =>{
          this.countryArray = countries;
        });
  }

  guardar(){
    console.log("Jala")
  }
}
