import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConnectApisService } from '../../connect-apis.service';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.scss']
})
export class ViewDoctorComponent implements OnInit {

  id: number;
  user: Doctor;
  constructor(private activatedRoute: ActivatedRoute, private api: ConnectApisService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = +params.get('id');
      this.api.onGetDoctor(this.id).subscribe(res => {
        this.user = res;
      })
    });
  }

}
