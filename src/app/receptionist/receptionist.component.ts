import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Receptionist } from '../models/receptionist.model';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.scss']
})
export class ReceptionistComponent implements OnInit {

  receptionist: Receptionist = new Receptionist();
  constructor(private router: Router) { }

  ngOnInit(): void {
    let email = localStorage.getItem('receptionist-email');
    if (email === null) {
      this.router.navigate(['index'])
    } else {
      this.receptionist.email = email;
      this.receptionist.id = +localStorage.getItem('receptionist-id');
      this.receptionist.name = localStorage.getItem('receptionist-name');
    }
  }

}
