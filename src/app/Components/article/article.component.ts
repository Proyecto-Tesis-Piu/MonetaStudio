import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ArticlesService } from "../../Services/articles.service";
import { Router } from '@angular/router';
import { SnackBarService } from '../../Services/snack-bar.service';
import { Article } from '../../Models/article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, AfterViewInit {
  public href: string = "";
  public web: string = "";

  article: Article;

  //@ViewChild("test", { static: true }) test: ElementRef;


  constructor(private activated: ActivatedRoute,
    private _service: ArticlesService,
    private router: Router,
    private _snackBar: SnackBarService) {

    this.activated.params.subscribe(params => {
      this._service.getArticle(params['i']).subscribe((article: Article) => {
        this.article = article;
      });
    })
  }

  ngAfterViewInit(): void {
    document.getElementById("articleBody").innerHTML = this.article.text;
    //document.getElementById("tags").innerHTML = this.articulo.tags;
    //document.getElementById("biblio").innerHTML = this.articulo.biblio;
  }


  ngOnInit(): void {
    this.href = this.router.url;
    this.web = "www.moneta.studio" + this.href;
    
  }

  openCustomSnackBar() {
    this._snackBar.show("Copiado a portapapeles", "Cerrar", { duration: 2000 });
  }

}
