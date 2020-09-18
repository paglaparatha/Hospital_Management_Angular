import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Admin } from '../../models/admin.model'
import { NgForm } from '@angular/forms';
import { ConnectApisService } from '../../connect-apis.service';
import { Slider } from '../../models/slider.model';
import { upload_path } from '../../utils/util';
import { Post } from '../../models/posts.model';
import { MedicineUnit } from '../../models/medicine-unit.model';
import { Medicine } from '../../models/medicine.model';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.scss']
})
export class AdminIndexComponent implements OnInit {
  admin: Admin = new Admin();
  fileToUpload: File = null;
  sliders: Slider[];
  baseUrl = upload_path;
  posts: Post[];
  admins: Admin[];
  units: MedicineUnit[];
  medicines: Medicine[];
  constructor(private router: Router, private api: ConnectApisService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.admin.email = localStorage.getItem('email');
    this.admin.id = +localStorage.getItem('admin-id');
    this.admin.name = localStorage.getItem('admin-name')

    this.onGetSliders();
    this.onGetPost();
    this.onGetAdmins();
    this.onGetUnits();
    this.onGetMedicines()
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onGetSliders() {
    this.api.onGetSlider().subscribe(res => {
      this.sliders = res;
    })
  }

  onUploadSlider(form: NgForm) {
    this.api.onAddSlider(this.fileToUpload).subscribe(res => {
      if (res.status == 'success') {
        alert('Slider Image Uploaded!');
        this.onGetSliders()
      }

      form.reset();
    })
  }

  onDeleteSlider(id: number) {
    this.api.onDeleteSlider(id).subscribe(res => {
      if (res.status == 'success') {
        alert('Slider Image Deleted!');
        this.onGetSliders()
      }
    })
  }

  onAddPost(form: NgForm) {
    let name = form.value.name;
    let description = form.value.description;

    this.api.onAddPost(name, description).subscribe(res => {
      if (res.status == 'error') {
        alert(res.description)
      } else {
        this.onGetPost()
      }

      form.reset();
    })
  }

  onGetPost() {
    this.api.onGetPost().subscribe(res => {
      this.posts = res;
    })
  }

  onDeletePost(id: number) {
    this.api.onDeletePost(id).subscribe(res => {
      if (res.status == 'error') {
        alert(res.description)
      } else {
        this.onGetPost()
      }
    })
  }

  onAddAdmin(form: NgForm) {
    let name = form.value.name;
    let email = form.value.email;
    let password = form.value.password;

    this.api.onAddAdmin(name, email, password).subscribe(res => {
      if (res.status == 'error') {
        alert(res.description)
      } else {
        this.onGetAdmins()
      }

      form.reset();
    })
  }

  onGetAdmins() {
    this.api.onGetAdmins().subscribe(res => {
      this.admins = res;
    })
  }

  onDeleteAdmin(id: number) {
    this.api.onDeleteAdmin(id).subscribe(res => {
      if (res.status == 'error') {
        alert(res.description)
      } else {
        this.onGetAdmins()
      }
    })
  }

  onAddUnit(form: NgForm) {
    let type = form.value.type;
    this.api.onAddUnit(type).subscribe(res => {
      if (res.status == 'error') {
        alert(res.description)
      } else {
        this.onGetUnits()
      }

      form.reset();
    })
  }

  onGetUnits() {
    this.api.onGetUnits().subscribe(res => {
      this.units = res;
    })
  }

  onDeleteUnit(id: number) {
    this.api.onDeleteUnit(id).subscribe(res => {
      if (res.status == 'error') {
        alert(res.description)
      } else {
        this.onGetUnits()
      }
    })
  }

  onAddMedicine(form: NgForm) {
    let name = form.value.name;
    let description = form.value.description;
    let type = form.value.type;
    let quantity = form.value.quantity;

    this.api.onAddMedicine(name, description, type, quantity).subscribe(res => {
      if (res.status == 'error') {
        alert(res.description)
      } else {
        this.onGetMedicines()
      }
    })
  }

  onSearchMedicines(form: NgForm) {
    let search = form.value.search;
    this.api.onSearchMedicines(search).subscribe(res => {
      this.medicines = res;
    })
  }

  onGetMedicines() {
    this.api.onGetMedicines().subscribe(res => {
      this.medicines = res;
    })
  }

  onUpdateForm(form: NgForm) {
    let name = form.value.name;
    let description = form.value.description;
    let type = form.value.type;
    let quantity = form.value.quantity;
    let id = form.value.id;

    this.api.onUpdateMedicine(name, description, type, quantity, id).subscribe(res => {
      if (res.status == 'error') {
        alert(res.description)
      } else {
        this.onGetMedicines()
      };
    })
  }

  onDeleteMedicine(event: any) {
    let id = event.target.getAttribute('data-id');
    this.api.onDeleteMedicine(id).subscribe(res => {
      if (res.status == 'error') {
        alert(res.description)
      } else {
        this.onGetMedicines()
      };
    })
  }


}
