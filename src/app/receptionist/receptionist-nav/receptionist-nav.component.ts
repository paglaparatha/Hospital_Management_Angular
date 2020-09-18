import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receptionist-nav',
  templateUrl: './receptionist-nav.component.html',
  styleUrls: ['./receptionist-nav.component.scss']
})
export class ReceptionistNavComponent implements OnInit {
  collapse: boolean = true;
  constructor() { }

  ngOnInit(): void {

  }

  onLogout(){
    localStorage.clear()
  }
}
