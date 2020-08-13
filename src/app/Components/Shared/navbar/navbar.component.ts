import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  token:any;

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
