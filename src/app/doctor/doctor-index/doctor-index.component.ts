import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Appointment } from '../../models/appointment.model';
import { ConnectApisService } from '../../connect-apis.service';
import { Doctor } from '../../models/doctor.model';
import { Medicine } from '../../models/medicine.model';

@Component({
  selector: 'app-doctor-index',
  templateUrl: './doctor-index.component.html',
  styleUrls: ['./doctor-index.component.scss']
})
export class DoctorIndexComponent implements OnInit {

  public myForm: FormGroup;
  prevRemarks: {remarks: String}[];
  myAppointments: Appointment[];
  user: Doctor;
  appointment: Appointment;
  faPlus = faPlus;
  faTimes = faTimes;
  medicines: { name: string }[];
  selectedMedicineType: { type: string }[];
  selectedMedicine: Medicine;
  constructor(private _fb: FormBuilder, private api: ConnectApisService) { }

  ngOnInit(): void {
    let id = localStorage.getItem('doctor-id');
    this.api.onGetDoctor(+id).subscribe(res => {
      this.user = res;
      this.onGetAppointments();
    });

    this.myForm = this._fb.group({
      patientId: ['', [Validators.required]],
      appointmentId: ['', [Validators.required]],
      doctorRemark: [''],
      prescription: this._fb.array([
        this.initPrescription(),
      ])
    });

    this.api.onGetDistinctMedicines().subscribe(res => {
      this.medicines = res;
    })
  }

  initPrescription() {

    return this._fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      quantity: ['', [Validators.min(1), Validators.required, Validators.pattern("^[0-9]*$"),]],
      description: ['', [Validators.required]],
    });
  }

  addMedField() {
    const control = <FormArray>this.myForm.controls['prescription'];
    control.insert(0, this.initPrescription());
  }

  removeMedField(i: number) {
    const control = <FormArray>this.myForm.controls['prescription'];
    control.removeAt(i);
  }

  save(model) {
    let form = new FormData();
    let i = 0;
    form.append('patientId', model.value.patientId);
    form.append('doctorId', this.user.id.toString());
    form.append('doctorRemark', model.value.doctorRemark);
    form.append('appointmentId', model.value.appointmentId);

    model.value.prescription.forEach(pres => {
      form.append(`name[${i}]`, pres.name);
      form.append(`type[${i}]`, pres.type);
      form.append(`quantity[${i}]`, pres.quantity);
      form.append(`description[${i}]`, pres.description);
      i++;
    });

    form.append('counter', i.toString());
    form.append('create-prescription', 'true');

    this.api.onCreatePrescription(form).subscribe(res => {
      if (res.status == 'error') {
        alert(res.description)
      } else {
        const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
        WindowPrt.document.write(`
        <html>
          <head>
            <title>Print Prescription</title>
            <style>
              #customers {
                font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
                border-collapse: collapse;
                width: 100%;
              }

              #customers td, #customers th {
                border: 1px solid #ddd;
                padding: 8px;
              }

              #customers tr:nth-child(even){background-color: #f2f2f2;}

              #customers tr:hover {background-color: #ddd;}

              #customers th {
                padding-top: 12px;
                padding-bottom: 12px;
                text-align: left;
                background-color: #4CAF50;
                color: white;
              }
            </style>
          </head>
          <body>
            <h1 style="text-align: center; text-transform: capitalize;">${this.appointment.patient.name}</h1>
            <h2 style="text-align: center;">${this.appointment.patientId}</h2>
            <div>
              <p>
                <strong style="float: left">Date: ${this.appointment.date}</strong>
                <strong style="float: right">Doctor: Dr. ${this.user.name}</strong>
              </p>
            </div>
            <br/>
            <h5>${model.value.remark && model.value.remark !== '' ? `<p>Remark: ${model.value.doctorRemark}</p>` : ''}</h5>
            <table id="customers">
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
              ${model.value.prescription.map(pres => {
          return `
                <tr>
                  <td>${pres.name}</td>
                  <td>${pres.type}</td>
                  <td>${pres.quantity}</td>
                  <td>${pres.description}</td>
                </tr>
                `;
        }).join('')}
              </tbody>
            </table>
            <hr>
            <h4>Total Fees: ${this.user.fees}</h4>
          </body>
        </html>
        `);
        WindowPrt.document.close();
        WindowPrt.focus();
        WindowPrt.print();
        const control = <FormArray>this.myForm.controls['prescription'];
        while (control.length !== 1) {
          this.removeMedField(control.length - 1);
        }
        model.reset();
        this.onGetAppointments();
      }
    });
  }

  onGetAppointments() {
    this.api.onGetDoctorAppointments(this.user.id).subscribe(res => {
      this.myAppointments = res;
    })
  }

  onGetTypes(name, type) {
    this.api.onGetMedicineType(name.target.value).subscribe(res => {
      this.selectedMedicineType = res;
    });

    this.selectedMedicine = null;

    if (type.value !== '') {
      this.onGetMedicine(name.target.value, type.value)
    }
  }

  onGetMedicine(name, type) {
    this.api.onGetDoctorMedicine(name, type).subscribe(res => {
      this.selectedMedicine = res;
    })
  }

  onSetAppointment(app: Appointment) {
    this.appointment = app;
    this.api.onGetPatientRemarks(app.patientId).subscribe(res => {
      this.prevRemarks = res;
    })
  }


}
