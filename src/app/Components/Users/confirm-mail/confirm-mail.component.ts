import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../shared/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-mail',
  templateUrl: './confirm-mail.component.html',
  styleUrls: ['./confirm-mail.component.css']
})
export class ConfirmMailComponent implements OnInit {

  success:boolean = false;


  constructor(private activated: ActivatedRoute,
    private _userservice: UserService,
    private router: Router) { 



      this.activated.params.subscribe(params => {
        this._userservice.confirmEmail(params["t"]).subscribe((res: Response) => {
          if(res.status == 200){
            this.success = true;
          }
          else{
            this.success = false;
            console.log(res);
          }
        });
        
      });

    }

  

  ngOnInit(): void {
  }

}
