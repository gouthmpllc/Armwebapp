import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminListService } from '../../../../services/superAdmin/admin-list-service/admin-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {
  newAdmin: any = {};
  allRanks: any = [];
  userName: string;
  ranObj: any = {};

  @Output() displayListChanged = new EventEmitter<boolean>();
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

  createAdmin() {
    this.newAdmin['rank'] = this.ranObj.name;
    this.newAdmin['rankId'] = this.ranObj.id;
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
