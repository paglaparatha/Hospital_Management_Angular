import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { base, api_key } from './utils/util';
import { Admin } from './models/admin.model';
import { ApiError } from './models/error.model'
import { Slider } from './models/slider.model'
import { Post } from './models/posts.model'
import { MedicineUnit } from './models/medicine-unit.model'
import { Medicine } from './models/medicine.model'
import { Receptionist } from './models/receptionist.model'
import { Doctor } from './models/doctor.model'
import { Patient } from './models/patient.model'
import { Appointment } from './models/appointment.model'

@Injectable({
  providedIn: 'root'
})
export class ConnectApisService {
  constructor(private http: HttpClient) { }



  onStaffLogin(email: string, password: string, submit: string) {
    let form: FormData = new FormData();
    form.append('email', email);
    form.append('password', password);
    form.append(submit, 'true');

    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  //Admin Section
  onAddSlider(file: File) {
    let form: FormData = new FormData();
    form.append('file', file, file.name);
    form.append('add-slider', 'true');

    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  onGetSlider() {
    return this.http.get<Slider[]>(`${base}?api-key=${api_key}&get-sliders=true`)
  }

  onDeleteSlider(id: number) {
    return this.http.get<ApiError>(`${base}?api-key=${api_key}&delete-slider=${id}`)
  }

  onAddPost(name: string, description: string) {
    let form: FormData = new FormData();
    form.append('name', name);
    form.append('description', description);
    form.append('add-doctor-post', 'true')

    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  onGetPost() {
    return this.http.get<Post[]>(`${base}?api-key=${api_key}&get-doctor-posts=true`);
  }

  onDeletePost(id: number) {
    return this.http.get<ApiError>(`${base}?api-key=${api_key}&delete-doctor-post=${id}`);
  }

  onAddAdmin(name: string, email: string, password: string) {
    let form: FormData = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('password', password);
    form.append('add-admin', 'true');

    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  onGetAdmins() {
    return this.http.get<Admin[]>(`${base}?api-key=${api_key}&get-admins=true`);
  }

  onDeleteAdmin(id: number) {
    return this.http.get<ApiError>(`${base}?api-key=${api_key}&delete-admin=${id}=true`);
  }

  onAddUnit(type: string) {
    let form: FormData = new FormData();
    form.append('type', type);
    form.append('add-medicine-unit', 'true');

    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  onGetUnits() {
    return this.http.get<MedicineUnit[]>(`${base}?api-key=${api_key}&get-medicine-units=true`);
  }

  onDeleteUnit(id: number) {
    return this.http.get<ApiError>(`${base}?api-key=${api_key}&delete-medicine-unit=${id}=true`);
  }

  onAddMedicine(name: string, description: string, type: string, quantity: number) {
    let form = new FormData();
    form.append('name', name);
    form.append('description', description);
    form.append('type', type);
    form.append('quantity', quantity.toString());
    form.append('add-medicine', 'true');

    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  onGetMedicines() {
    return this.http.get<Medicine[]>(`${base}?api-key=${api_key}&get-medicines=true`);
  }

  onSearchMedicines(search: string) {
    return this.http.get<Medicine[]>(`${base}?api-key=${api_key}&search-medicines=${search}`);
  }

  onUpdateMedicine(name: string, description: string, type: string, quantity: number, id: number) {
    let form = new FormData();
    form.append('name', name);
    form.append('description', description);
    form.append('type', type);
    form.append('quantity', quantity.toString());
    form.append('id', id.toString());
    form.append('update-medicine', 'true');

    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  onDeleteMedicine(id: number) {
    return this.http.get<ApiError>(`${base}?api-key=${api_key}&delete-medicine=${id}`);
  }

  onAddReceptionist(name: string, email: string, dob: Date, gender: string) {
    let form = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('dob', dob.toString());
    form.append('gender', gender);
    form.append('add-receptionist', 'true');

    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  onUpdateReceptionist(name: string, email: string, dob: Date, gender: string, id: number) {
    let form = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('dob', dob.toString());
    form.append('gender', gender);
    form.append('id', id.toString())
    form.append('update-receptionist', 'true');

    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  onGetReceptionists() {
    return this.http.get<Receptionist[]>(`${base}?api-key=${api_key}&get-receptionists=true`);
  }

  onSearchReceptionists(search: string) {
    return this.http.get<Receptionist[]>(`${base}?api-key=${api_key}&search-receptionists=${search}`);
  }

  onDeleteReceptionist(id: number) {
    return this.http.get<ApiError>(`${base}?api-key=${api_key}&delete-receptionist=${id}`);
  }

  onAddDoctor(
    name: string,
    email: string,
    gender: string,
    postId: number,
    fees: number,
    mobile: string,
    experience: number,
    open_time: Date,
    close_time: Date
  ) {

    let form = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('gender', gender);
    form.append('postId', postId.toString());
    form.append('fees', fees.toString());
    form.append('mobile', mobile);
    form.append('experience', experience.toString());
    form.append('open_time', open_time.toString())
    form.append('close_time', close_time.toString());
    form.append('add-doctor', 'true')

    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  onGetDoctors() {
    return this.http.get<Doctor[]>(`${base}?api-key=${api_key}&get-doctors=true`);
  }

  onSearchDoctors(search: string) {
    return this.http.get<Doctor[]>(`${base}?api-key=${api_key}&search-doctors=${search}`);
  }

  onUpdateDoctor(
    name: string,
    email: string,
    gender: string,
    postId: number,
    fees: number,
    mobile: string,
    experience: number,
    open_time: Date,
    close_time: Date,
    id: number
  ) {
    let form = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('gender', gender);
    form.append('postId', postId.toString());
    form.append('fees', fees.toString());
    form.append('mobile', mobile);
    form.append('experience', experience.toString());
    form.append('open_time', open_time.toString())
    form.append('close_time', close_time.toString());
    form.append('id', id.toString());
    form.append('update-doctor', 'true')

    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  onDeleteDoctor(id: number) {
    return this.http.get<ApiError>(`${base}?api-key=${api_key}&delete-doctor=${id}`);
  }

  //Patient Section
  onPatientSignup(email: string, password: string, name: string, dob: Date, gender: string, mobile: string, address: string) {
    let form = new FormData();
    form.append('email', email);
    form.append('password', password);
    form.append('name', name);
    form.append('dob', dob.toString());
    form.append('gender', gender);
    form.append('mobile', mobile);
    form.append('address', address);
    form.append('add-patient', 'true');

    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  onPatientLogin(email: string, password: string) {
    let form = new FormData();
    form.append('email', email);
    form.append('password', password);
    form.append('patient-login', 'true');

    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  onUpdatePatient(form: FormData) {
    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  onGetPatient(email: string) {
    return this.http.get<Patient>(`${base}?api-key=${api_key}&get-patient=${email}`);
  }

  onAddAppointment(form: FormData) {
    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  onGetAppointments(id: number) {
    return this.http.get<Appointment[]>(`${base}?api-key=${api_key}&get-appointments=${id}`);
  }

  onUpdatePatientImage(file: File, id: number) {
    let form: FormData = new FormData();
    form.append('file', file, file.name);
    form.append('id', id.toString());
    form.append('update-patient-image', 'true');

    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  onChangePatientPassword(form: FormData) {
    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  onGetReceptionist(email: string) {
    return this.http.get<Receptionist>(`${base}?api-key=${api_key}&get-receptionist=${email}`);
  }

  onGetPendingAppointments() {
    return this.http.get<Appointment[]>(`${base}?api-key=${api_key}&get-pending-appointments=true`);
  }

  onConfirmAppointment(form: FormData) {
    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  onCancelAppointment(id: number) {
    return this.http.get<ApiError>(`${base}?api-key=${api_key}&cancel-appointment=${id}`);
  }

  onGetDoctor(id: number) {
    return this.http.get<Doctor>(`${base}?api-key=${api_key}&get-doctor=${id}`);
  }

  onDoctorLogin(email: string, password: string) {
    let form = new FormData();
    form.append('email', email);
    form.append('password', password);
    form.append('doctor-login', 'true');

    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  onGetDoctorAppointments(id: number) {
    return this.http.get<Appointment[]>(`${base}?api-key=${api_key}&get-my-appointments=${id}`);
  }

  onGetDistinctMedicines() {
    return this.http.get<{name: string}[]>(`${base}?api-key=${api_key}&get-distinct-medicines=true`);
  }

  onGetMedicineType(name: string) {
    return this.http.get<{type: string}[]>(`${base}?api-key=${api_key}&get-medicine-type=${name}`);
  }

  onGetDoctorMedicine(name: string, type: string) {
    return this.http.get<Medicine>(`${base}?api-key=${api_key}&name=${name}&type=${type}&get-doctor-medicine=true`);
  }

  onCreatePrescription(form: FormData) {
    return this.http.post<ApiError>(`${base}?api-key=${api_key}`, form);
  }

  onGetPatientRemarks(id: number) {
    return this.http.get<{remarks: String}[]>(`${base}?api-key=${api_key}&get-doctor-remarks=${id}`);
  }

  onGetPrescription(id: number) {
    return this.http.get<{}>(`${base}?api-key=${api_key}&get-prescription=${id}`);
  }
}
