import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';
import { User } from '../usuario.model';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  response:any;
  loginForm:FormGroup;

  currentUser: User;
  //userEmail: String = undefined;
  //password: String = undefined;

  constructor(public formBuilder: FormBuilder, public loginService: LoginService) { 
    this.loginForm = new FormGroup({
      userEmail: new FormControl(''),
      password: new FormControl('')
    })
  }

  ngOnInit(): void {
      
  }

  submit_onClick(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value.userEmail, this.loginForm.value.password)
        .subscribe((data: User) => this.currentUser = data, 
                  err => console.log(err), 
                  () => console.log('Complete'));
    }
  }
}
