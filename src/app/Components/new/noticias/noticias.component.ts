import { Component, OnInit } from '@angular/core';
import { NewsService, Noticia } from "../service/news.service";

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  noticias:Noticia[] = [];

  constructor( private newService:NewsService) { }

  ngOnInit(): void {
    this.noticias = this.newService.getNews();

    console.log(this.noticias);
  }

}
