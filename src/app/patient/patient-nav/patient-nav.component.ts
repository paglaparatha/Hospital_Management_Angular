import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-nav',
  templateUrl: './patient-nav.component.html',
  styleUrls: ['./patient-nav.component.scss']
})
export class PatientNavComponent implements OnInit {
  collapse: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  onLogout(){
    localStorage.removeItem('patient-email')
  }

}
