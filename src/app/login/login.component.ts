import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConnectApisService } from '../connect-apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private api: ConnectApisService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm){
    let email = form.value.email;
    let password = form.value.password;

    this.api.onPatientLogin(email, password).subscribe(res => {
      if(res.status == 'error'){
        alert(res.description);
        form.reset();
      }
      else{
        localStorage.setItem('patient-email', res.description);
        this.router.navigate(['patient'])
      }
    })
  }
}
