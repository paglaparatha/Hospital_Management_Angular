import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConnectApisService } from '../connect-apis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  passwordMatched: boolean = true;
  constructor(private api: ConnectApisService, private router: Router) { }

  ngOnInit(): void {
  }

  onVerifyPass(pass, cpass) {
    this.passwordMatched = pass.value === cpass.value
  }

  onSignUp(form: NgForm) {
    let email = form.value.email;
    let password = form.value.password;
    let name = form.value.name;
    let dob = form.value.dob;
    let gender = form.value.gender;
    let mobile = form.value.mobile;
    let address = form.value.address;

    this.api.onPatientSignup(email, password, name, dob, gender, mobile, address).subscribe(res => {
      if(res.status == 'error'){
        alert(res.description);
      } else{
        alert('Successfully Signed Up! Please login to continue.');
        this.router.navigate(['/login']);
      }
    })
  }

}
