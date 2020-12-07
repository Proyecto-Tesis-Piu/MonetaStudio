import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NewsService } from "../service/news.service";
import { Router } from '@angular/router';
import { SnackBarService } from '../../Shared/Snackbar/snack-bar.service';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit, AfterViewInit {
  public href: string = "";
  public web: string = "";
  //public message: string = "copiada en el portapapeles";

  noticia: any = {};

  //@ViewChild("test", { static: true }) test: ElementRef;


  constructor(private activated: ActivatedRoute,
    private _service: NewsService,
    private router: Router,
    private _snackBar: SnackBarService) {

    this.activated.params.subscribe(params => {
      this.noticia = this._service.getNew(params['i']);
    })
  }

  ngAfterViewInit(): void {
    document.getElementById("newsBody").innerHTML = this.noticia.bio;
    //document.getElementById("tags").innerHTML = this.noticia.tags;
    //document.getElementById("biblio").innerHTML = this.noticia.biblio;
  }


  ngOnInit(): void {
    this.href = this.router.url;
    this.web = "www.moneta.studio" + this.href;
    
  }

  openCustomSnackBar() {
    this._snackBar.show("Copiado a portapapeles", "Cerrar", { duration: 2000 });
  }

}
