import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminListService } from '../../../../services/superAdmin/admin-list-service/admin-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateListService } from '../../../../services/admin/candidate-list-service/candidate-list.service';

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.css']
})
export class CreateCandidateComponent implements OnInit {
  newCandidate: any = {};
  loginData: any;
  allRanks: any = [];
  allSubUnits: any = [];
  genderCode: any;
  gender: any;
  userName: string;
  genders: any = [
    {name: 'Male', value: '1'},
    {name: 'Female', value: '2'},
  ];
  @Output() displayListChanged = new EventEmitter<boolean>();
  constructor(private adminListService: AdminListService, private cookieService: CookieService,
    private route: ActivatedRoute, private router: Router, private candidateListService: CandidateListService) {
    this.route.params.subscribe( params => {
      if (params) {
        this.userName = params.userName;
      }
      console.log('vv' + JSON.stringify(params));
    });
    }

  ngOnInit() {
    this.loginData = this.cookieService.getObject('loginResponce');
    console.log(JSON.stringify(this.loginData));
    this.loadArmyRanks();
    this.loadSubUnits();
    if (this.userName) {
      this.loadSelectedCandidate(this.userName);
    }
  }


  loadSelectedCandidate(currentUser) {
    this.candidateListService.getCurrentCandidateList(currentUser).subscribe(
      (data: any) => {
        console.log('cccccccccccccc' + JSON.stringify(data));
        this.newCandidate = data.data[0];
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

  loadSubUnits() {
    this.adminListService.getAllSubUnits().subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.allSubUnits = data.data;
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
    });
  }

  onSelectionChange(gender) {
    this.gender = gender.name;
    this.genderCode = gender.value;
  }

  createCandidate() {
    console.log(JSON.stringify(this.newCandidate));
    this.newCandidate.gender = this.gender;
    this.newCandidate.genderCode = this.genderCode;
    this.newCandidate.createdBy = this.loginData.data.userId;
    this.newCandidate.createdStatus = 'NEW';
    this.newCandidate.status = 'active';
    this.newCandidate.candDob = '18-03-1990';
    this.newCandidate.age = +this.newCandidate.age;
    // console.log(JSON.stringify(this.newCandidate));
    this.adminListService.createCandidate(this.newCandidate).subscribe(
      (data: any) => {
        this.displayListChanged.emit(true);
        // console.log(JSON.stringify(data));
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
    });

  }

  updateCandidate() {
    this.adminListService.updateCandidate(this.newCandidate).subscribe(
      (data: any) => {
        alert('updated successfully');

        if (this.loginData) {
          if (this.loginData.data.role === 'SUPERADMIN') {
            if (this.userName) {
              this.router.navigate(['superAdmin/candidateList']);
            } else {
              this.displayListChanged.emit(true);
            }
          } else if (this.loginData.data.role === 'ADMIN') {
            if (this.userName) {
              this.router.navigate(['admin/candidateList']);
            } else {
              this.displayListChanged.emit(true);
            }
          }
        }

        // console.log(JSON.stringify(data));
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
    });
  }
  

}
