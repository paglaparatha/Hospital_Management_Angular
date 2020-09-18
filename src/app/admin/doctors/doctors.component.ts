import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ConnectApisService } from '../../connect-apis.service';
import { Post } from '../../models/posts.model';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  posts: Post[];
  doctors: Doctor[] = [];
  constructor(private api: ConnectApisService) { }

  ngOnInit(): void {
    this.api.onGetPost().subscribe(res => {
      this.posts = res;
    })

    this.onGetDoctors()
  }

  onAddDoctors(form: NgForm) {
    let name: string = form.value.name;
    let email: string = form.value.email;
    let gender: string = form.value.gender;
    let postId: number = form.value.postId;
    let fees: number = form.value.fees;
    let mobile: string = form.value.mobile;
    let experience: number = form.value.experience;
    let open_time: Date = form.value['open_time']
    let close_time: Date = form.value['close_time'];

    this.api.onAddDoctor(
      name,
      email,
      gender,
      postId,
      fees,
      mobile,
      experience,
      open_time,
      close_time,
    ).subscribe(res => {
      if (res['status'] == 'error') {
        alert(res.description)
      } else {
        this.onGetDoctors();
      }
    })
  }

  onGetDoctors() {
    this.api.onGetDoctors().subscribe(res => {
      this.doctors = res;
    })
  }

  onSearchDoctors(form: NgForm) {
    let search = form.value.search;

    this.api.onSearchDoctors(search).subscribe(res => {
      this.doctors = res;
    })
  }

  onUpdateDoctor(form: NgForm) {
    let name: string = form.value.name;
    let email: string = form.value.email;
    let gender: string = form.value.gender;
    let postId: number = form.value.postId;
    let fees: number = form.value.fees;
    let mobile: string = form.value.mobile;
    let experience: number = form.value.experience;
    let open_time: Date = form.value['open_time']
    let close_time: Date = form.value['close_time'];
    let id = form.value.id;

    this.api.onUpdateDoctor(
      name,
      email,
      gender,
      postId,
      fees,
      mobile,
      experience,
      open_time,
      close_time,
      id
    ).subscribe(res => {
      if (res['status'] == 'error') {
        alert(res.description)
      } else {
        this.onGetDoctors();
      }
    })
  }

  onDeleteDoctor(event: any) {
    let id = event.target.getAttribute('data-id');
    this.api.onDeleteDoctor(id).subscribe(res => {
      if (res['status'] == 'error') {
        alert(res.description)
      } else {
        this.onGetDoctors();
      }
    });

  }

}
