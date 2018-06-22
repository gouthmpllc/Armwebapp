import { Component, OnInit, Inject } from '@angular/core';
import { AdminListService } from '../../../services/superAdmin/admin-list-service/admin-list.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

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
  loadingStatus: boolean;
  constructor(private adminListService: AdminListService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadAllAdmins();
  }

  loadAllAdmins() {
    this.loadingStatus = true;
    this.adminListService.getAllAdminList().subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.loadingStatus = false;
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
    const dialogRef = this.dialog.open(AdminConfirmDialogComponent, {
      width: '300px',
      data: admin
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.adminListService.deleteAdmin(admin).subscribe(
              (data: any) => {
                alert('deleted Successfully');
                this.loadAllAdmins();
              },
              error => {
                console.log(JSON.stringify(error));
            });
      } else {
        return false;
      }
    });

    // if (confirm('Are you sure?!')) {
    //   this.adminListService.deleteAdmin(admin).subscribe(
    //     (data: any) => {
    //       alert('deleted Successfully');
    //       this.loadAllAdmins();
    //     },
    //     error => {
    //       console.log(JSON.stringify(error));
    //   });
    // } else {
    //   return false;
    // }

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


@Component({
  selector: 'app-admin-confirm-dialog',
  templateUrl: './admin-confirm-dialog.html'
  // providers: [EventStudentListComponent]
})
export class AdminConfirmDialogComponent {
  deleteConfirm: boolean;

  constructor(
    public dialogRef: MatDialogRef<AdminConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onNoClick(): void {
    this.dialogRef.close();

  }
}