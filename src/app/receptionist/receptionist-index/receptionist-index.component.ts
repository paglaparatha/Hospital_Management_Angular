import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ConnectApisService } from '../../connect-apis.service';
import { Doctor } from '../../models/doctor.model';
import { Receptionist } from '../../models/receptionist.model';
import { Appointment } from '../../models/appointment.model';
import { Post } from '../../models/posts.model';


@Component({
  selector: 'app-receptionist-index',
  templateUrl: './receptionist-index.component.html',
  styleUrls: ['./receptionist-index.component.scss']
})
export class ReceptionistIndexComponent implements OnInit {

  doctors: Doctor[];
  email: string;
  user: Receptionist;
  pendingAppointments: Appointment[];
  today = new Date().toJSON().split('T')[0];

  doctorSpecialization: Post[];
  postDoctors: Doctor[] = [];
  constructor(private api: ConnectApisService) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('receptionist-email');
    this.onGetReceptionist(this.email);
  }

  ngAfterViewInit(): void {
    this.onGetAppointments();

    this.api.onGetPost().subscribe(res => {
      this.doctorSpecialization = res;
    });

    this.api.onGetDoctors().subscribe(res => {
      this.doctors = res;
    });
  }

  onGetDoctors(postId: number, time: Date) {
    this.postDoctors = postId == -1 ? this.doctors.filter(elmnt => (Date.parse(`01/01/2011 ${elmnt.open_time}`) <= Date.parse(`01/01/2011 ${time}:00`) && Date.parse(`01/01/2011 ${elmnt.close_time}`) >= Date.parse(`01/01/2011 ${time}:00`))) : this.doctors.filter(elmnt => (elmnt.postId == postId && Date.parse(`01/01/2011 ${elmnt.open_time}`) <= Date.parse(`01/01/2011 ${time}:00`) && Date.parse(`01/01/2011 ${elmnt.close_time}`) >= Date.parse(`01/01/2011 ${time}:00`)));
  }

  onGetDoctor(id: number) {
    let desc: any = this.postDoctors.filter(elmnt => elmnt.id == id);
    desc = desc[0];
    return `Dr. ${desc.name} charges ₹${desc.fees} and has an experience of ${desc.experience} ${desc.experience == 1 ? 'year' : 'years'}`;
  }

  onGetReceptionist(email: string) {
    this.api.onGetReceptionist(email).subscribe(res => {
      this.user = res;
    })
  }

  onGetAppointments() {
    this.api.onGetPendingAppointments().subscribe(res => {
      this.pendingAppointments = res;
    });
  }

  onHandleAppointment(form: NgForm) {
    let date = form.value.date;
    let time = form.value.time;
    let postId = form.value.postId;
    let doctorId = form.value.doctorId;
    let remarks = form.value.remarks;
    let id = form.value.id;

    let myForm = new FormData();
    myForm.append('date', date);
    myForm.append('time', time);
    myForm.append('postId', postId);
    myForm.append('doctorId', doctorId);
    myForm.append('remarks', remarks);
    myForm.append('id', id);
    myForm.append('update-appointment', 'true');

    this.api.onConfirmAppointment(myForm).subscribe(res => {
      if (res.status == 'error') {
        alert(res.description)
      } else {
        form.reset();
        this.onGetAppointments()
      }
    })
  }

  onCancelAppointment(event: any) {
    this.api.onCancelAppointment(+event.target.getAttribute('data-id')).subscribe(res => {
      if (res.status == 'error') {
        alert(res.description)
      } else {
        this.onGetAppointments()
      }
    })

  }

}
