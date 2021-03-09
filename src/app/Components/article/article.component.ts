import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ArticlesService } from "../../Services/articles.service";
import { Router } from '@angular/router';
import { SnackBarService } from '../../Services/snack-bar.service';
import { Article, Bibliography } from 'src/app/Models/article.model';

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

        var text = document.getElementById("articleBody");
        text.innerHTML = this.article.text;

        //bibliography renderer
        if (this.article.bibliography) {
          var biblio = document.getElementById("bibliographies");
          var hr = document.createElement("hr");
          biblio.appendChild(hr);
          var h3 = document.createElement("h3");
          h3.setAttribute("style","font-weight: bold;");
          h3.innerText = "Bibliografía:";
          biblio.appendChild(h3);

          this.article.bibliography.forEach(item => {
            var div: HTMLElement = document.createElement("div");
            div.innerText = item.text;
            biblio.appendChild(div);
            if (item.url) {
              var link: HTMLElement = document.createElement("a");
              link.innerText = item.url;
              link.setAttribute("href", item.url);
              div.appendChild(link);
            }
            var br: HTMLElement = document.createElement("br");
            biblio.appendChild(br);
            biblio.appendChild(br);
          });
        }
      });
    })
  }

  ngAfterViewInit(): void {
    if (this.article) {
      document.getElementById("articleBody").innerHTML = this.article.text;

      if (this.article.bibliography) {
        var biblio = document.getElementById("bibliographies");
        this.article.bibliography.forEach(item => {
          var div: HTMLElement = document.createElement("div");
          div.innerText = item.text;
          biblio.appendChild(div);
          if (item.url) {
            var link: HTMLElement = document.createElement("a");
            link.innerText = item.url;
            link.setAttribute("href", item.url);
            div.appendChild(link);
          }
          var br: HTMLElement = document.createElement("br");
          biblio.appendChild(br);
          biblio.appendChild(br);
        });
      }
    }

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
