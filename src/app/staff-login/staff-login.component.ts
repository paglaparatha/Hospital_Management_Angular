import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ConnectApisService } from '../connect-apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.scss']
})
export class StaffLoginComponent implements OnInit {
  post = 'receptionist';
  submitName = 'receptionist-login';
  message: string = null;

  constructor(private api: ConnectApisService, private router: Router) { }

  ngOnInit(): void {
  }

  onChangePost(post: string) {
    this.post = post;
    this.submitName = `${post}-login`;
  }

  onSubmit(form: NgForm) {
    let email = form.value.email;
    let password = form.value.password;
    let submit = this.submitName;
    this.api.onStaffLogin(email, password, submit).subscribe(res => {
      if (res['status']) {
        this.message = res['description'];
      } else {
        localStorage.setItem(`${this.post}-email`, res['email']);
        localStorage.setItem(`${this.post}-name`, res['name']);
        localStorage.setItem(`${this.post}-id`, res['id']);
        this.router.navigate([`${this.post}`])
      }
    })
  }
}
