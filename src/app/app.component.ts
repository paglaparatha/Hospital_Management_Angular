import { Component } from '@angular/core';
  
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'appBootstrap';
  myStr:string;
  
  constructor(private modalService: NgbModal) {}
    
  open(content) {
    this.myStr = 'Hi'
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {  
      this.myStr = 'null'
      });
  }
  
}