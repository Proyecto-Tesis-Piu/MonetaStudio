import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../shared/user.service";

@Component({
  selector: 'app-confirm-mail',
  templateUrl: './confirm-mail.component.html',
  styleUrls: ['./confirm-mail.component.css']
})
export class ConfirmMailComponent {

  success: boolean = false;


  constructor(private activated: ActivatedRoute,
    private _userservice: UserService) {

    this.activated.params.subscribe(params => {
      this._userservice.confirmEmail(params["t"]).subscribe((res: any) => {
        //console.log(res);
        if (res.succeeded) {
          this.success = true;
        } else {
          this.success = false;
          console.log(res);
        }
      });

    });

  }
}
