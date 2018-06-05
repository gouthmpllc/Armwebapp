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
  rankCatName: any;
  rankCatId: any;
  candidateUploadLocResp: any;
  fileName: any;
  subUnitId: any;
  subUnit: any;
  maxDate = new Date();

  newCandidate: any = {};
  loginData: any;
  allRanks: any = [];
  allSubUnits: any = [];
  allRankCategories: any = [];
  genderCode: any;
  gender: any;
  rank: any;
  rankId: any;
  userName: string;
  genders: any = [
    {name: 'Male', value: 1},
    {name: 'Female', value: 2},
  ];
  @Output() displayListChanged = new EventEmitter<boolean>();
  formData: FormData = new FormData();
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
    this.loadRankCategorys();
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

  loadRankCategorys() {
    this.adminListService.getRankCategorys().subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.allRankCategories = data.data;
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

  onRankChange(id) {
    for (let i = 0; i < this.allRanks.length; i++) {
      if (id === this.allRanks[i].id ) {
        this.rank = this.allRanks[i].name;
        this.rankId = this.allRanks[i].id;
        return;
      }
    }
  }

  onSubUnitChange(id) {
    for (let i = 0; i < this.allSubUnits.length; i++) {
      if (id === this.allSubUnits[i].id ) {
        this.subUnit = this.allSubUnits[i].name;
        this.subUnitId = this.allSubUnits[i].id;
        return;
      }
    }
  }

  onRankCatChange(id) {
    for (let i = 0; i < this.allRankCategories.length; i++) {
      if (id === this.allRankCategories[i].id ) {
        this.rankCatName = this.allRankCategories[i].name;
        this.rankCatId = this.allRankCategories[i].id;
        return;
      }
    }
  }

  uploadDatasource(fileInput: any) {
    const fileDetails = fileInput.target.files[0];
    this.fileName = fileDetails.name;
    this.formData.append('file', fileDetails);
  }

  createCandidate() {
    this.adminListService.uploadPic(this.formData).subscribe(
      (data: any) => {
        console.log(JSON.stringify(data));
        this.candidateUploadLocResp = data.data.result.files.file[0].providerResponse.location;
        console.log(JSON.stringify(this.newCandidate));
        this.newCandidate.gender = this.gender;
        this.newCandidate.genderCode = +this.genderCode;

        this.newCandidate.rank = this.rank;
        this.newCandidate.rankId = this.rankId;
        this.newCandidate.subunit = this.subUnit;
        this.newCandidate.subunitId = this.subUnitId;

        this.newCandidate.rankCatgName = this.rankCatName;
        this.newCandidate.rankCatgId = this.rankCatId;

        this.newCandidate.profilePic = this.candidateUploadLocResp;
        this.newCandidate.createdBy = this.loginData.data.userId;
        this.newCandidate.createdStatus = 'NEW';
        this.newCandidate.status = 'active';
        delete this.newCandidate.rankCat;
        this.newCandidate.age = this.calculateAge(this.newCandidate.candDob);
        console.log(JSON.stringify(this.newCandidate));
        this.adminListService.createCandidate(this.newCandidate).subscribe(
          (data1: any) => {
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

  calculateAge(dob) {
    let ageDifMs = Date.now() - dob.getTime();
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
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
