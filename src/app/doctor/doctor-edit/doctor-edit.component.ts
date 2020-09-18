import { Component, OnInit } from '@angular/core';
import { ConnectApisService } from '../../connect-apis.service';
import { faUserAlt, faKey } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.scss']
})
export class DoctorEditComponent implements OnInit {

  user: Doctor;

  faUser = faUserAlt;
  faKey = faKey;
  npass1: string = '';
  npass2: string = '';
  constructor(private api: ConnectApisService) { }

  ngOnInit(): void {
    let id = localStorage.getItem('doctor-id');
    this.onGetUser(+id);
  }

  onChangePassword(form: NgForm) {
    let myForm = new FormData();
    myForm.append('id', this.user.id.toString());
    myForm.append('cpass', form.value.cpass);
    myForm.append('npass1', form.value.npass1);
    myForm.append('npass2', form.value.npass2);
    myForm.append('change-doctor-password', 'true');

    this.api.onChangePatientPassword(myForm).subscribe(res => {
      if (res.status == 'error') {
        alert(res.description)
      } else {
        form.reset();
      }
    })
  }

  onGetUser(id: number) {
    this.api.onGetDoctor(+id).subscribe(res => {
      this.user = res;
    });
  }

  onUpdateProfile(form: NgForm) {
    this.api.onUpdateDoctor(
    form.value.name,
    form.value.email,
    form.value.gender,
    this.user.postId,
    form.value.fees,
    form.value.mobile,
    this.user.experience,
    form.value.open_time,
    form.value.close_time,
    this.user.id
    ).subscribe(res => {
      if (res.status == 'error') {
        alert(res.description)
      } else {
        this.onGetUser(this.user.id)
      }
    })
  }

}
