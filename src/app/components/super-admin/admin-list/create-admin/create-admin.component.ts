import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminListService } from '../../../../services/superAdmin/admin-list-service/admin-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {
  candidateUploadLocResp: any;
  fileName: any;
  newAdmin: any = {};
  allRanks: any = [];
  userName: string;
  ranObj: any = {};

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
  }

  createAdmin() {
    this.adminListService.uploadPic(this.formData).subscribe(
      (data: any) => {
        console.log(JSON.stringify(data));
        this.candidateUploadLocResp = data.data.result.files.file[0].providerResponse.location;
        this.newAdmin['rank'] = this.ranObj.name;
        this.newAdmin['rankId'] = this.ranObj.id;
        this.newAdmin['profilePic'] = this.candidateUploadLocResp;
        console.log(JSON.stringify(this.newAdmin));
        this.adminListService.createAdmin(this.newAdmin).subscribe(
          (data1: any) => {
            alert('created successfully');
            this.displayListChanged.emit(true);
          },
          error1 => {
            console.log(JSON.stringify(error1));
        });
      },
      error => {
        console.log(JSON.stringify(error));
    });

  }

  updateAdmin() {
    console.log(JSON.stringify(this.newAdmin));
    this.newAdmin.rankId = this.newAdmin.rank;
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
