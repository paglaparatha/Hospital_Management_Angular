import { Component, OnInit } from '@angular/core';

import { Receptionist } from '../../models/receptionist.model';
import { ConnectApisService } from '../../connect-apis.service';
import { faUserAlt, faKey } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-receptionist-edit',
  templateUrl: './receptionist-edit.component.html',
  styleUrls: ['./receptionist-edit.component.scss']
})
export class ReceptionistEditComponent implements OnInit {

  email: string;
  user: Receptionist;

  faUser = faUserAlt;
  faKey = faKey;
  npass1: string = '';
  npass2: string = '';
  constructor(private api: ConnectApisService) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('receptionist-email');
    this.onGetReceptionist();
  }

  onGetReceptionist() {
    this.api.onGetReceptionist(this.email).subscribe(res => {
      this.user = res;
    })
  }

  onChangePassword(form: NgForm) {
    let myForm = new FormData();
    myForm.append('id', this.user.id.toString());
    myForm.append('cpass', form.value.cpass);
    myForm.append('npass1', form.value.npass1);
    myForm.append('npass2', form.value.npass2);
    myForm.append('change-receptionist-password', 'true');

    this.api.onChangePatientPassword(myForm).subscribe(res => {
      if (res.status == 'error') {
        alert(res.description)
      } else {
        form.reset();
      }
    })
  }

  onUpdateProfile(form: NgForm) {
    this.api.onUpdateReceptionist(form.value.name, form.value.email, this.user.dob, form.value.gender, this.user.id).subscribe(res => {
      if(res.status == 'error') {
        alert(res.description)
      } else {
        this.email = form.value.email;
        localStorage.setItem('receptionist-email', form.value.email);
        this.onGetReceptionist();
      }
    })
  }

}
