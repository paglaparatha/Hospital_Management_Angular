import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../../models/admin.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  admin: Admin = new Admin();
  constructor(private router: Router) { }

  ngOnInit(): void {
    let email = localStorage.getItem('admin-email')
    if (email === null) {
      this.router.navigate(['index'])
    } else {
      this.admin.email = email;
      this.admin.id = +localStorage.getItem('admin-id');
      this.admin.name = localStorage.getItem('admin-name')
    }
  }

}
