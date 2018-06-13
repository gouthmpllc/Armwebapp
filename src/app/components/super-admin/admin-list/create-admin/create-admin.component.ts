import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminListService } from '../../../../services/superAdmin/admin-list-service/admin-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {
  appointmentObj: any;
  candidateUploadLocResp: any;
  fileName: any;
  newAdmin: any = {};
  allRanks: any = [];
  userName: string;
  ranObj: any = {};
  allAppointments: any = [];
  @Output() displayListChanged = new EventEmitter<boolean>();
  formData: FormData = new FormData();
  constructor(private adminListService: AdminListService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe( params => {
      if (params) {
        this.userName = params.userName;
      }
      // console.log('vv' + JSON.stringify(params));
    });
  }

  ngOnInit() {
    // this.newAdmin.rank = null;
    this.loadArmyRanks();
    this.loadArmyAppointments();
    if (this.userName) {
      this.loadSelectedAdmin(this.userName);
    }
  }

  loadSelectedAdmin(currentUser) {
    this.adminListService.getCurrentAdminList(currentUser).subscribe(
      (data: any) => {
        console.log(JSON.stringify(data));
        this.newAdmin = data.data[0];
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
    });
  }

  loadArmyRanks() {
    this.adminListService.getAllRanks().subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.allRanks = data.data;
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
    });
  }

  loadArmyAppointments() {
    this.adminListService.getAllAppointments().subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.allAppointments = data.data;
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
    });
  }

  setSelectedAppointment(id) {
    this.allAppointments.filter(appointment => {
      if (id === appointment.id) {
        if (appointment.allow === 'single') {
          this.adminListService.checkAppointment(appointment.id).subscribe(
            (data: any) => {
              console.log(JSON.stringify(data));
              if (data.data.count < 1) {
                  // this.appointmentObj = appointment;
                  return appointment.id;
              } else {
                alert('Selected Appointment is already allocated to another person');
                this.newAdmin.appointmentId = '';
                return;
              }
              // this.allAppointments = data.data;
            },
            error => {
              console.log(JSON.stringify(error));
          });
        } else {
          // this.appointmentObj = appointment;
          return appointment.id;
        }
      }
    });
  }

  setSelectedRank(selRankId) {
    this.allRanks.filter(rank => {
      if (selRankId === rank.id) {
        this.ranObj = rank;
        return;
      }
    });
  }
  
  uploadDatasource(fileInput: any) {
    const fileDetails = fileInput.target.files[0];
    this.fileName = fileDetails.name;
    this.formData.append('file', fileDetails);
    if (!fileInput) {
      this.formData = new FormData();
    }
  }

  createAdmin() {
    if (this.formData && this.fileName) {
      this.adminListService.uploadPic(this.formData).subscribe(
        (data: any) => {
          console.log(JSON.stringify(data));
          this.candidateUploadLocResp = data.data.result.files.file[0].providerResponse.location;
          this.formData = new FormData();
          this.fileName = '';
          this.postAdmin();
        },
        error => {
          console.log(JSON.stringify(error));
      });
    } else {
      this.postAdmin();
    }

  }

  postAdmin() {
    this.newAdmin['rank'] = this.ranObj.name;
    this.newAdmin['rankId'] = this.ranObj.id;
    // this.newAdmin['appointmentId'] = this.appointmentObj.id;
    this.newAdmin['profilePic'] = this.candidateUploadLocResp;
    console.log(JSON.stringify(this.newAdmin));
    this.adminListService.createAdmin(this.newAdmin).subscribe(
      (data: any) => {
        alert('created successfully');
        this.displayListChanged.emit(true);
      },
      error => {
        console.log(JSON.stringify(error));
    });
  }

  editAdmin() {
    if (this.formData && this.fileName) {
      this.adminListService.uploadPic(this.formData).subscribe(
        (data: any) => {
          console.log(JSON.stringify(data));
          this.candidateUploadLocResp = data.data.result.files.file[0].providerResponse.location;
          this.formData = new FormData();
          this.fileName = '';
          this.updateAdmin();
        },
        error => {
          console.log(JSON.stringify(error));
      });
    } else {
      this.updateAdmin();
    }
  }

  updateAdmin() {
    if (this.ranObj) {
      this.newAdmin['rank'] = this.ranObj.name;
      this.newAdmin['rankId'] = this.ranObj.id;
    }
    if (this.candidateUploadLocResp) {
      this.newAdmin['profilePic'] = this.candidateUploadLocResp;
    }
    // this.newAdmin.rankId = this.newAdmin.rank;
    this.newAdmin.password = this.newAdmin.credential;
    this.adminListService.updateAdmin(this.newAdmin).subscribe(
      (data: any) => {
        alert('updated successfully');
        if (this.userName) {
          this.router.navigate(['superAdmin/adminList']);
        } else {
          this.displayListChanged.emit(true);
        }
        // console.log(JSON.stringify(data));
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
    });
  }

}
