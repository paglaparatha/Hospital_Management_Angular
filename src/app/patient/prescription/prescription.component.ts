import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConnectApisService } from '../../connect-apis.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {

  appId: number;
  prescription;
  constructor(private api: ConnectApisService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.appId = +params.get('id');
      this.api.onGetPrescription(this.appId).subscribe(res => {
        console.log(res)
        this.prescription = res
      })
    })
  }

}
