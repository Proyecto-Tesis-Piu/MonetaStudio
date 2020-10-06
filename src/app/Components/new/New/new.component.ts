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
    private _service: NewsService) {

    this.activated.params.subscribe(params => {
      this.noticia =  this._service.getNew(params['i']);
      console.log(this._service.getNew(params['i']))
    })

  }

  ngOnInit(): void {
  }

}
