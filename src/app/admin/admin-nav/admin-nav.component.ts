import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {
  collapse:boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear()
  }
}
