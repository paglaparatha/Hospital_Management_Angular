import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-nav',
  templateUrl: './doctor-nav.component.html',
  styleUrls: ['./doctor-nav.component.scss']
})
export class DoctorNavComponent implements OnInit {

  collapse: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  onLogout(){
    localStorage.removeItem('patient-email')
  }

  reload() {
    window.location.reload();
  }

}
