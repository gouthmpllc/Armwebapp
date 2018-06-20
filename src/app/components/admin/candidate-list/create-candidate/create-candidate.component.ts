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
  selectedTab: number;
  showPPET: boolean;
  showBpet: boolean;
  rankCatName: any;
  rankCatId: any;
  candidateUploadLocResp: any;
  fileName: any;
  subUnitId: any;
  subUnit: any;
  maxDate = new Date();

  BPETTestTypes: any = [];
  PPETTestTypes: any = [];
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
  readOnly: boolean;
  editable: boolean;
  @Output() displayListChanged = new EventEmitter<boolean>();
  formData: FormData = new FormData();

  barGraphData: any = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Test Name';
  view: any[] = [480, 330];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FF0000']
  };
  startDate: any;
  endDate: any;
  sdate: any = {};
  tabF: string;
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
      this.loadPPETTestTypes();
      this.showBpet = true;
      this.editable = true;
    }
  }


  loadSelectedCandidate(currentUser) {
    this.candidateListService.getCurrentCandidateList(currentUser).subscribe(
      (data: any) => {
        console.log('cccccccccccccc' + JSON.stringify(data));
        if (data.data.length > 0) {
          this.newCandidate = data.data[0];
          this.loadBPETTestTypes();
          this.readOnly = true;
        } else {
          alert('Candidate Not Found');
          this.router.navigate(['superAdmin/candidateList']);
        }
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

  onSelectionChange(id) {
    for (let i = 0; i < this.genders.length; i++) {
      if (id === this.genders[i].value ) {
        this.gender = this.genders[i].name;
        this.genderCode = this.genders[i].value;
        return;
      }
    }
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
    if (fileInput) {
      const fileDetails = fileInput.target.files[0];
      this.fileName = fileDetails.name;
      this.formData.append('file', fileDetails);
    } else {
      this.fileName = '';
      this.formData = new FormData();
    }
  }

  editToListView() {
    this.router.navigate(['superAdmin/candidateList']);
  }

  createCandidate() {

    if (this.formData && this.fileName) {
      this.adminListService.uploadPic(this.formData).subscribe(
        (data: any) => {
          console.log(JSON.stringify(data));
          this.candidateUploadLocResp = data.data.result.files.file[0].providerResponse.location;
          this.postCandidate();
          this.fileName = '';
          this.formData = new FormData();
          // console.log(JSON.stringify(this.newCandidate));
        },
        error => {
          console.log(JSON.stringify(error));
      });
    } else {
      this.postCandidate();
    }

  }

  postCandidate() {
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
    this.newCandidate.createdByArmy = this.loginData.data.username;
    delete this.newCandidate.rankCat;
    this.newCandidate.age = this.calculateAge(this.newCandidate.candDob);
    console.log(JSON.stringify(this.newCandidate));
    this.adminListService.createCandidate(this.newCandidate).subscribe(
      (data1: any) => {
        this.displayListChanged.emit(true);
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

  enableEditFields() {
    this.editable = !this.editable;
  }

  editCandidate() {
    if (this.formData && this.fileName) {
      this.adminListService.uploadPic(this.formData).subscribe(
        (data: any) => {
          console.log(JSON.stringify(data));
          this.candidateUploadLocResp = data.data.result.files.file[0].providerResponse.location;
          this.updateCandidate();
          this.fileName = '';
          this.formData = new FormData();
          // console.log(JSON.stringify(this.newCandidate));
        },
        error => {
          console.log(JSON.stringify(error));
      });
    } else {
      this.updateCandidate();
    }
  }

  updateCandidate() {

    if (this.rank && this.rankId) {
      this.newCandidate.rank = this.rank;
      this.newCandidate.rankId = this.rankId;
    }
    if (this.subUnit && this.subUnitId) {
      this.newCandidate.subunit = this.subUnit;
      this.newCandidate.subunitId = this.subUnitId;
    }
    if (this.rankCatName && this.rankCatId) {
      this.newCandidate.rankCatgName = this.rankCatName;
      this.newCandidate.rankCatgId = this.rankCatId;
    }
    if (this.candidateUploadLocResp) {
      this.newCandidate.profilePic = this.candidateUploadLocResp;
    }

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

  loadBPETTestTypes() {
    this.adminListService.getBPETTestTypes().subscribe(
      (data: any) => {
        console.log('ssss' + JSON.stringify(data));
        this.BPETTestTypes = data.data;
        // this.getWeeklyBPETData(this.BPETTestTypes[0].id, 0);
        this.setWeeklyCandidateReports();
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
    });
  }

  loadPPETTestTypes() {
    this.adminListService.getPPETTestTypes().subscribe(
      (data: any) => {
        console.log('ssss' + JSON.stringify(data));
        this.PPETTestTypes = data.data;
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
    });
  }

  setWeeklyCandidateReports(dateRangeType?: string) {
    this.BPETTestTypes = this.BPETTestTypes;
    let minusDate;
    if (dateRangeType === 'monthly' || dateRangeType === 'yearly' || dateRangeType === 'weekly') {
      this.sdate = {};
    }

    if (this.sdate.startDate && this.sdate.endDate) {
      this.tabF = '';
      this.startDate = (this.sdate.startDate.getMonth() + 1) + '/' +
      this.sdate.startDate.getDate() + '/' + this.sdate.startDate.getFullYear();
      this.endDate = (this.sdate.endDate.getMonth() + 1) + '/' + this.sdate.endDate.getDate() + '/' + this.sdate.endDate.getFullYear();
    } else {
      this.sdate = {};
      if (dateRangeType === 'monthly') {
        this.tabF = 'monthly';
        minusDate =  new Date(new Date().getTime() - (60 * 60 * 24 * 30 * 1000));
        this.startDate = (minusDate.getMonth() + 1) + '/' + minusDate.getDate() + '/' + minusDate.getFullYear();
        this.endDate = (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + new Date().getFullYear();
      } else if (dateRangeType === 'yearly') {
        this.tabF = 'yearly';
        minusDate =  new Date(new Date().getTime() - (60 * 60 * 24 * 365 * 1000));
        this.startDate = (minusDate.getMonth() + 1) + '/' + minusDate.getDate() + '/' + minusDate.getFullYear();
        this.endDate = (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + new Date().getFullYear();
      } else {
        this.tabF = 'weekly';
        minusDate =  new Date(new Date().getTime() - (60 * 60 * 24 * 7 * 1000));
        this.startDate = (minusDate.getMonth() + 1) + '/' + minusDate.getDate() + '/' + minusDate.getFullYear();
        this.endDate = (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + new Date().getFullYear();
      }
    }

    this.getWeeklyBPETData(this.BPETTestTypes[0].id, this.startDate, this.endDate, 0);
  }

  setCandidateBPETReports() {
    // this.BPETTestTypes = this.BPETTestTypes;
    this.showBpet = true;
    this.getWeeklyBPETData(this.BPETTestTypes[0].id, this.startDate, this.endDate, 0);
  }

  setCandidatePPETReports() {
    this.showBpet = false;
    // this.BPETTestTypes = this.PPETTestTypes;
    this.getWeeklyBPETData(this.PPETTestTypes[0].id, this.startDate, this.endDate, 0);
  }

  getWeeklyBPETData(bTypeid, sDate, eDate, index) {
    this.barGraphData = [];
    this.selectedTab = index;
    this.adminListService.gettestTypesData(this.newCandidate.id, bTypeid, eDate, sDate).subscribe(
      (data: any) => {
        console.log('dddddddddddddd' + JSON.stringify(data));
        if (data.data.length > 0) {
          this.yAxisLabel = data.data[0].name;
          this.barGraphData = this.formatTobarChart(data.data);
          if (this.barGraphData.length < 10) {
            this.view = [250, 330];
          } else if (this.barGraphData.length < 15) {
            this.view = [350, 330];
          } else {
            this.view = [480, 330];
          }
        }
      },
      error => {
        console.log(JSON.stringify(error));
    });
  }

  getBPETTestateReports(bTypeId, index) {
     this.getWeeklyBPETData(bTypeId, this.startDate, this.endDate, index);
  }

  formatTobarChart(resultWiseData) {
    // console.log('resultWiseData' + JSON.stringify(resultWiseData));
    let groups = {};
    for (let i = 0; i < resultWiseData.length; i++) {
      const groupName = resultWiseData[i].date;
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push({'name': resultWiseData[i].testResult, 'value': resultWiseData[i].value});
    }
    resultWiseData = [];
    for (const groupName in groups) {
      if (true) {
        resultWiseData.push({name: groupName, series: groups[groupName]});
      }
    }
    console.log(JSON.stringify(resultWiseData));
    return resultWiseData;
  }

}
