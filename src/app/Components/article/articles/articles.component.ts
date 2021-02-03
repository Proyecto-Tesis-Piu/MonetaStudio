import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../Services/articles.service';
import { Article } from '../../../Models/article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles:Article[] = [];

  constructor( private ArticlesService:ArticlesService) { }

  ngOnInit(): void {
    this.ArticlesService.getArticles().subscribe((item:Article[]) => {
      this.articles = item;
    });
  }

}
