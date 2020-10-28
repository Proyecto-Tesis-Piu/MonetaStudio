import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NewsService } from "../service/news.service";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { style } from '@angular/animations';
import { duration } from 'moment';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  public href: string = "";
  public web: string = "";
  public message: string = "copiada en el portapapeles";

  noticia: any = {};

  constructor(private activated: ActivatedRoute,
    private _service: NewsService, 
    private router: Router, private _snackBar: MatSnackBar) {

    this.activated.params.subscribe(params => {
      this.noticia = this._service.getNew(params['i']);
      console.log(this._service.getNew(params['i']))
    })

  }

  ngOnInit(): void {
    this.href = this.router.url;
    console.log(this.router.url);
    this.web =  this.href;
    //this.web = "www.savio.com" + this.href;

  }

  openCustomSnackBar(){
    this._snackBar.open("Copiado a portapapeles", "Cerrar", {duration: 2000});
  }

}
