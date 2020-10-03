import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NewsService } from "../service/news.service";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  noticia: any = {};

  constructor(private activated: ActivatedRoute,
    private _heroe: NewsService) {

    this.activated.params.subscribe(params => {
      this.noticia =  this._heroe.getNoticias(params['id']);
    })

  }

  ngOnInit(): void {
  }

}
