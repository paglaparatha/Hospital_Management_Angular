import { Patient } from './patient.model';

export class Appointment {
  id: number;
  date: Date;
  time: Date;
  postId: number;
  doctorId: number;
  doctorName: string;
  remarks: string;
  patientId: number;
  confirmed: number;
  patient: Patient;
}
