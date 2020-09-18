import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { IndexComponent } from './index/index.component';
import { AboutComponent } from './about/about.component';
import { StaffLoginComponent } from './staff-login/staff-login.component';
import { AdminIndexComponent } from './admin/admin-index/admin-index.component';
import { ProfilesComponent } from './admin/profiles/profiles.component';
import { AdminComponent } from './admin/admin/admin.component';
import { DoctorsComponent } from './admin/doctors/doctors.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PatientComponent } from './patient/patient.component';
import { PatientIndexComponent } from './patient/patient-index/patient-index.component';
import { EditComponent as PatientEditComponent } from './patient/edit/edit.component';
import { PrescriptionComponent as PatientPrescriptionComponent } from './patient/prescription/prescription.component';
import { ReceptionistComponent } from './receptionist/receptionist.component';
import { ReceptionistIndexComponent } from './receptionist/receptionist-index/receptionist-index.component';
import { ViewDoctorComponent } from './receptionist/view-doctor/view-doctor.component';
import { ReceptionistEditComponent } from './receptionist/receptionist-edit/receptionist-edit.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorIndexComponent } from './doctor/doctor-index/doctor-index.component';
import { DoctorEditComponent } from './doctor/doctor-edit/doctor-edit.component';


const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'staff-login', component: StaffLoginComponent },
  {
    path: 'admin', component: AdminComponent, children:
      [
        { path: '', pathMatch: 'full', redirectTo: 'index' },
        { path: 'index', component: AdminIndexComponent },
        { path: 'profiles', component: ProfilesComponent },
        { path: 'doctors', component: DoctorsComponent },
      ]
  },
  {
    path: 'patient', component: PatientComponent, children:
      [
        { path: '', pathMatch: 'full', redirectTo: 'index' },
        { path: 'index', component: PatientIndexComponent },
        { path: 'edit', component: PatientEditComponent },
        { path: 'prescription', pathMatch: 'full', redirectTo: 'index' },
        { path: 'prescription/:id', component: PatientPrescriptionComponent }
      ]
  },
  {
    path: 'receptionist', component: ReceptionistComponent, children:
      [
        { path: '', pathMatch: 'full', redirectTo: 'index' },
        { path: 'index', component: ReceptionistIndexComponent },
        { path: 'doctor', pathMatch: 'full', redirectTo: 'index' },
        { path: 'edit', component: ReceptionistEditComponent },
        { path: 'doctor/:id', component: ViewDoctorComponent }
      ]
  },
  {
    path: 'doctor', component: DoctorComponent, children:
    [
      { path: '', pathMatch: 'full', redirectTo: 'index' },
      { path: 'index', component: DoctorIndexComponent },
      { path: 'edit', component: DoctorEditComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
