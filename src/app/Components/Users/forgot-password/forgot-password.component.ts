import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { UserService } from '../../../Services/user.service';
import { User } from '../../../Models/user.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  passwordForm: FormGroup;


  constructor(private router: Router,
    public service: UserService,
    protected storageMap: StorageMap,
    private fb: FormBuilder
  ) {
    this.passwordForm = new FormGroup({
      forgotEmail: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  send_email() {
    if (this.passwordForm.valid) {
      this.service.forgotPassword(this.passwordForm.value.forgotEmail)
        .subscribe(
          (res: any) => {
            this.storageMap.set('token', res.token).subscribe(() => { });
            localStorage.setItem('token', res.token);
          });
    }
  }



}
