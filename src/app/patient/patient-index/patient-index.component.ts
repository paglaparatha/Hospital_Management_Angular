import { Component, OnInit } from '@angular/core';
import { faUser, faCalendar, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ConnectApisService } from '../../connect-apis.service';
import { Patient } from '../../models/patient.model';
import { upload_path } from '../../../app/utils/util';
import { Post } from '../../models/posts.model';
import { Doctor } from '../../models/doctor.model';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-patient-index',
  templateUrl: './patient-index.component.html',
  styleUrls: ['./patient-index.component.scss']
})
export class PatientIndexComponent implements OnInit {

  faUser = faUser;
  faCalendar = faCalendar;
  faCalendarAlt = faCalendarAlt;
  email: string;
  user: Patient;
  upload = upload_path;
  today = new Date().toJSON().split('T')[0];

  doctorSpecialization: Post[];
  doctors: Doctor[];
  postDoctors: Doctor[];
  appointments: Appointment[];

  pastAppointments: Appointment[];
  currentAppointments: Appointment[];
  upcomingAppointments: Appointment[];
  canceledAppointments: Appointment[];
  pendingAppointments: Appointment[];
  constructor(private api: ConnectApisService, private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.email = localStorage.getItem('patient-email');
    this.api.onGetPatient(this.email).subscribe(res => {
      this.user = res;
      this.onGetAppointments();
    });

    this.api.onGetPost().subscribe(res => {
      this.doctorSpecialization = res;
    });

    this.api.onGetDoctors().subscribe(res => {
      this.doctors = res;
    });

  }

  onGetPostDesc(id: number) {
    let desc = this.doctorSpecialization.filter(elmnt => elmnt.id == id);
    return desc[0].description;
  }

  onGetDoctors(postId: number, time: Date) {
    this.postDoctors = postId == -1 ? this.doctors.filter(elmnt => (Date.parse(`01/01/2011 ${elmnt.open_time}`) <= Date.parse(`01/01/2011 ${time}:00`) && Date.parse(`01/01/2011 ${elmnt.close_time}`) >= Date.parse(`01/01/2011 ${time}:00`))) : this.doctors.filter(elmnt => (elmnt.postId == postId && Date.parse(`01/01/2011 ${elmnt.open_time}`) <= Date.parse(`01/01/2011 ${time}:00`) && Date.parse(`01/01/2011 ${elmnt.close_time}`) >= Date.parse(`01/01/2011 ${time}:00`)));
  }

  onGetDoctor(id: number) {
    let desc: any = this.postDoctors.filter(elmnt => elmnt.id == id);
    desc = desc[0];
    return `Dr. ${desc.name} charges ₹${desc.fees} and has an experience of ${desc.experience} ${desc.experience == 1 ? 'year' : 'years'}`;
  }

  onAddAppointment(form: NgForm) {
    let date = form.value.date;
    let time = form.value.time;
    let postId = form.value.postId;
    let doctorId = form.value.doctorId;
    let remarks = form.value.remarks;
    let patientId = this.user.id;

    let myForm = new FormData();
    myForm.append('date', date);
    myForm.append('time', time);
    myForm.append('postId', postId);
    myForm.append('doctorId', doctorId);
    myForm.append('remarks', remarks);
    myForm.append('patientId', patientId.toString());
    myForm.append('add-appointment', 'true');

    this.api.onAddAppointment(myForm).subscribe(res => {
      if (res.status == 'error') {
        alert(res.description)
      } else {
        form.reset();
        alert('Your appointment request has been sent! Once approved, you can see your appointments below.')
        this.onGetAppointments()
      }
    })
  }

  onGetAppointments() {
    this.api.onGetAppointments(this.user.id).subscribe(res => {
      this.appointments = res;
      this.pastAppointments = res.filter(elmnt => Date.parse(this.datePipe.transform(new Date(), "yyyy-MM-dd")) > Date.parse(elmnt.date.toString()) && elmnt.confirmed != -1);
      this.currentAppointments = res.filter(elmnt => Date.parse(this.datePipe.transform(new Date(), "yyyy-MM-dd")) == Date.parse(elmnt.date.toString()) && elmnt.confirmed != -1);
      this.upcomingAppointments = res.filter(elmnt => Date.parse(this.datePipe.transform(new Date(), "yyyy-MM-dd")) < Date.parse(elmnt.date.toString()) && elmnt.confirmed == 1);
      this.canceledAppointments = res.filter(elmnt => elmnt.confirmed == -1);
      this.pendingAppointments = res.filter(elmnt => elmnt.confirmed == 0);
    });
  }
}
