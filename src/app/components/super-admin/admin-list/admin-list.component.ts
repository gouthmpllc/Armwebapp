import { Component, OnInit } from '@angular/core';
import { AdminListService } from '../../../services/superAdmin/admin-list-service/admin-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  data: any = [];
  displayAdminList: boolean;
  adminQuery: string;
  public rowsOnPage = 10;
  public sortBy = 'createdAt';
  public sortOrder = 'desc';
  constructor(private adminListService: AdminListService, private router: Router) { }

  ngOnInit() {
    this.loadAllAdmins();
  }

  loadAllAdmins() {
    this.adminListService.getAllAdminList().subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.data = data.data;
      },
      error => {
        console.log(JSON.stringify(error));
    });
  }

  setAdminStatus() {
    this.displayAdminList = !this.displayAdminList;
  }

  callEmit(event) {
      this.setAdminStatus();
      this.loadAllAdmins();
  }

  adminEdit(selectedAdmin) {
    console.log(JSON.stringify(selectedAdmin));
    this.router.navigate(['superAdmin/adminList', selectedAdmin.username]);
  }

  setInActiveAdmin(selAdmin) {
    // console.log(JSON.stringify(selAdmin));
    selAdmin.status = 'inactive';
    const message = 'InActivated';
    this.editAdminStatus(selAdmin, message);
  }

  setActiveAdmin(selAdmin) {
    // console.log(JSON.stringify(selAdmin));
    selAdmin.status = 'active';
    const message = 'Activated';
    this.editAdminStatus(selAdmin, message);
  }

  removeAdmin(admin) {
    this.adminListService.deleteAdmin(admin).subscribe(
      (data: any) => {
        alert('deleted Successfully');
        this.loadAllAdmins();
        // console.log(JSON.stringify(data));
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
    });
  }

  editAdminStatus(selAdmin, message) {
    this.adminListService.updateAdmin(selAdmin).subscribe(
      (data: any) => {
        alert(message + 'Successfully');
        this.loadAllAdmins();
        // console.log(JSON.stringify(data));
      },
      error => {
        if (message === 'Activated') {
          selAdmin.status = 'inactive';
        } else if (message === 'Activated') {
          selAdmin.status = 'active';
        }
        // console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
    });
  }

}
