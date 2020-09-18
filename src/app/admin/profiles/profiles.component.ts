import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ConnectApisService } from '../../connect-apis.service';
import { Receptionist } from '../../models/receptionist.model';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  receptionists: Receptionist[];
  constructor(private api: ConnectApisService) { }

  ngOnInit(): void {

    this.onGetReceptionists();

  }

  onAddReceptionist(form: NgForm){
    let name = form.value.name;
    let email = form.value.email;
    let dob = form.value.dob;
    let gender = form.value.gender;

    this.api.onAddReceptionist(name, email, dob, gender).subscribe(res => {
      if(res.status == 'error'){
        alert(res.description);
      }else{
        this.onGetReceptionists()
      }
    })
  }

  onGetReceptionists(){
    this.api.onGetReceptionists().subscribe(res => {
      this.receptionists = res;
    })
  }

  onUpdateReceptionist(form: NgForm){
    let name = form.value.name;
    let email = form.value.email;
    let dob = form.value.dob;
    let gender = form.value.gender;
    let id = form.value.id;

    this.api.onUpdateReceptionist(name, email, dob, gender, id).subscribe(res => {
      if(res.status == 'error'){
        alert(res.description);
      }
    })
  }

  onSearchReceptionists(form: NgForm){
    let search = form.value.search;
    this.api.onSearchReceptionists(search).subscribe(res => {
      this.receptionists = res;
    })
  }

  onDeleteReceptionist(event: any){
    let id = event.target.getAttribute('data-id');
    this.api.onDeleteReceptionist(id).subscribe(res => {
      if(res.status == 'error'){
        alert(res.description);
      }else{
        this.onGetReceptionists()
      }
    })
  }

}
