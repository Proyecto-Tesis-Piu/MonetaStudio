import { Component, OnInit } from '@angular/core';
import { ArticlesService, Articulo } from "../service/articles.service";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  noticias:Articulo[] = [];

  constructor( private ArticlesService:ArticlesService) { }

  ngOnInit(): void {
    this.noticias = this.ArticlesService.getArticles();
  }

}
