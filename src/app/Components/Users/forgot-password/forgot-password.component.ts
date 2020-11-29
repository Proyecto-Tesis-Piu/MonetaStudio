import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  user: User;
  formModel: FormGroup;
  ErrorMessage:any;


  constructor(private router: Router,
    public service: UserService,
    protected storageMap: StorageMap,
    private fb: FormBuilder
  ) {

    this.storageMap.watch('token', { type: 'string' })
      .subscribe((result) => {
        if (result) {
          this.service.getUserProfile(result).subscribe(
            (res: User) => {
              console.log(res);
              this.user = res;
            },
            err => {
              this.user = new User();
              console.log(err);
            },
            () => {
              this.formModel = this.fb.group({
                //validators van aqui
                email: [this.user.email, [Validators.required, Validators.email]],
              });

            }
          )
        } else {
          this.user = new User();
          this.formModel = this.fb.group({
            //validators van aqui
            email: [this.user.email, [Validators.required, Validators.email]],
          });
        }
      });

  }



  ngOnInit(): void {
  }

  guardar() {
    this.service.register(this.user).subscribe(
      (res:any) => {
        if(res.succeeded){
          this.service.login(this.user.email, this.user.password).subscribe((res: any) => {
            this.storageMap.set('token', res.token).subscribe(() => {});
            localStorage.setItem('token', res.token);
          }, 
          err => {
            if(err.status == 400){
            }
            console.log(err)
          });
          //this.router.navigate(['transactions']);
        }else{
          res.errors.forEach(element => {
            switch(element.code) {
              case 'DuplicateUserName':
                this.ErrorMessage += 'User email already registered';
                break;
              default:
                this.ErrorMessage += 'Registration failed';
                //console.log(element.description);
                break;
            }
            console.log(element);
          });
        }
      },
      err => console.log(err)
    );
  }


  updateForm(value: any, property: string) {
    this.user[property] = value;
  }


}
