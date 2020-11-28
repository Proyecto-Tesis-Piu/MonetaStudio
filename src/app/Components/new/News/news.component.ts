import { Component, OnInit } from '@angular/core';
import { NewsService, Noticia } from "../service/news.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  noticias:Noticia[] = [];

  constructor( private newService:NewsService) { }

  ngOnInit(): void {
    this.noticias = this.newService.getNews();
  }

}
