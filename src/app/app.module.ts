import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { IndexComponent } from './index/index.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { StaffLoginComponent } from './staff-login/staff-login.component';
import { AdminIndexComponent } from './admin/admin-index/admin-index.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { ProfilesComponent } from './admin/profiles/profiles.component';
import { AdminComponent } from './admin/admin/admin.component';
import { DoctorsComponent } from './admin/doctors/doctors.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PatientComponent } from './patient/patient.component';
import { PatientIndexComponent } from './patient/patient-index/patient-index.component';
import { EditComponent as PatientEditComponent } from './patient/edit/edit.component';
import { PrescriptionComponent as PatientPrescriptionComponent } from './patient/prescription/prescription.component';
import { PatientNavComponent } from './patient/patient-nav/patient-nav.component';
import { ReceptionistComponent } from './receptionist/receptionist.component';
import { ReceptionistIndexComponent } from './receptionist/receptionist-index/receptionist-index.component';
import { ReceptionistNavComponent } from './receptionist/receptionist-nav/receptionist-nav.component';
import { ViewDoctorComponent } from './receptionist/view-doctor/view-doctor.component';
import { ReceptionistEditComponent } from './receptionist/receptionist-edit/receptionist-edit.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorIndexComponent } from './doctor/doctor-index/doctor-index.component';
import { DoctorEditComponent } from './doctor/doctor-edit/doctor-edit.component';
import { DoctorNavComponent } from './doctor/doctor-nav/doctor-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AboutComponent,
    NavbarComponent,
    FooterComponent,
    StaffLoginComponent,
    AdminIndexComponent,
    AdminNavComponent,
    ProfilesComponent,
    AdminComponent,
    DoctorsComponent,
    LoginComponent,
    SignUpComponent,
    PatientComponent,
    PatientIndexComponent,
    PatientEditComponent,
    PatientPrescriptionComponent,
    PatientNavComponent,
    ReceptionistComponent,
    ReceptionistIndexComponent,
    ReceptionistNavComponent,
    ViewDoctorComponent,
    ReceptionistEditComponent,
    DoctorComponent,
    DoctorIndexComponent,
    DoctorEditComponent,
    DoctorNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
