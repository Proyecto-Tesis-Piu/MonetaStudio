import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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

  constructor( private http: HttpClient) { 
    this.UserForm = new FormGroup({
      formUserName: new FormControl('', Validators.required),
      formUserLName: new FormControl('', Validators.required),
      formCountrySelect: new FormControl('', Validators.required),
      formStateSelect: new FormControl('', Validators.required),
      formAge: new FormControl('', [Validators.required, Validators.number]),
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
    
    this.http.get('http://localhost:49755/api/Country')
        .subscribe((countries:any) =>{
          this.countryArray = countries;
        });

  }

  ngOnInit(): void {
  }

  guardar(){
    console.log("Jala")
  }
}
