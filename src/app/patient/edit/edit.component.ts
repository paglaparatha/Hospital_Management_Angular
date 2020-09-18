import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faUserAlt, faImage, faKey } from '@fortawesome/free-solid-svg-icons';

import { Patient } from '../../models/patient.model';
import { ConnectApisService } from '../../connect-apis.service';
import { upload_path } from '../../utils/util';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  email: string;
  user: Patient;

  faUser = faUserAlt;
  faImage = faImage;
  faKey = faKey;
  path: string = upload_path;
  fileToUpload: File;
  npass1: string = '';
  npass2: string = '';

  constructor(private api: ConnectApisService) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('patient-email');
    this.onGetUser();
  }

  onUpdateProfile(form: NgForm) {
    let myForm = new FormData();
    myForm.append('id', this.user.id.toString());
    myForm.append('email', form.value.email);
    myForm.append('name', form.value.name);
    myForm.append('gender', form.value.gender);
    myForm.append('mobile', form.value.mobile);
    myForm.append('address', form.value.address);
    myForm.append('update-patient', 'true');

    this.api.onUpdatePatient(myForm).subscribe(res => {
      if (res.status == 'error') {
        alert(res.description)
      } else {
        localStorage.setItem('patient-email', form.value.email);
        this.email = form.value.email
        this.onGetUser();
      }
    })
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onUpdateImage(form: NgForm) {
    this.api.onUpdatePatientImage(this.fileToUpload, this.user.id).subscribe(res => {
      if (res.status == 'error') {
        alert(res.description)
      } else {
        this.onGetUser();
        form.reset();
      }
    })
  }

  onGetUser() {
    this.api.onGetPatient(this.email).subscribe(res => {
      this.user = res;
    });
  }

  onChangePassword(form: NgForm) {
    let myForm = new FormData();
    myForm.append('id', this.user.id.toString());
    myForm.append('cpass', form.value.cpass);
    myForm.append('npass1', form.value.npass1);
    myForm.append('npass2', form.value.npass2);
    myForm.append('change-patient-password', 'true');

    this.api.onChangePatientPassword(myForm).subscribe(res => {
      if (res.status == 'error') {
        alert(res.description)
      } else {
        form.reset();
      }
    })
  }

}
