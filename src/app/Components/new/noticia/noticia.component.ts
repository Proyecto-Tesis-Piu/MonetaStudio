import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {
  
  

  constructor( private activated:ActivatedRoute) { 

    this.activated.params.subscribe( params =>{
      console.log(params['id'])
    })

  }

  ngOnInit(): void {
  }

}
