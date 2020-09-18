import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { ConnectApisService } from '../connect-apis.service';
import { Slider } from '../models/slider.model';
import { upload_path } from '../utils/util';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  sliders: Slider[];
  baseUrl = upload_path;
  constructor(config: NgbCarouselConfig, private api: ConnectApisService){
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.onGetSliders();
  }

  onGetSliders(){
    this.api.onGetSlider().subscribe(res => {
      this.sliders = res;
    })
  }

}
