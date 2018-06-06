import { Component, OnInit } from '@angular/core';
import {single} from '../../admin/admin-dashboard/data';
import { SuperAdminSettingsService } from '../../../services/superAdmin/settings-service/super-admin-settings.service';
import { AdminListService } from '../../../services/superAdmin/admin-list-service/admin-list.service';
declare var AmCharts: any;
import {CookieService} from 'angular2-cookie/core';
import { CandidateListService } from '../../../services/admin/candidate-list-service/candidate-list.service';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.css']
})
export class SuperAdminDashboardComponent implements OnInit {
  currentTime: any;
  currentDate = new Date();
  dispayAdminTable: boolean;
  dispaySuperAdminTable: boolean;
  allData: any;
  data: any = [];
  single: any[];
  multi: any[];
  testBarChartData: any = [];
  view: any[] = [480, 330];
  BPETArray: any = [];
  PPETArray: any = [];
  BPETArrayBarData: any = [];
  PPETArrayBarData: any = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Test Name';
  showYAxisLabel = true;
  yAxisLabel = 'No .of Candidates';
  loginData: any;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FF0000']
  };

  public rowsOnPage = 10;
  public sortBy = 'createdAt';
  public sortOrder = 'desc';

  constructor(private superAdminSettingsService: SuperAdminSettingsService, private adminListService: AdminListService,
    private cookieService: CookieService, private candidateListService: CandidateListService) {
  }

  ngOnInit() {
    this.loginData = this.cookieService.getObject('loginResponce');
    this.loadDashBoardData();
    this.startTime();
    // if (this.loginData) {
    //   if (this.loginData.data.role === 'SUPERADMIN') {
    //     this.dispaySuperAdminTable = true;
    //     this.loadAllAdmins();
    //   } else if (this.loginData.data.role === 'ADMIN') {
    //     this.dispayAdminTable = true;
    //     this.loadCandidates();
    //   }
    // }

  }

  loadCandidates() {
    this.candidateListService.getAllCandidateList().subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.data = data.data;
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
    });
  }

  // formatting;
  loadDashBoardData() {
    this.superAdminSettingsService.getAllDashboardData().subscribe(
      (data: any) => {
        console.log(JSON.stringify(data));
        this.allData = data.data.data;
        this.BPETArray = this.formatTo(this.allData.testsData , 'BPET');
        this.PPETArray = this.formatTo(this.allData.testsData , 'PPET');
        this.BPETArrayBarData = this.formatTobarChart(this.formatTo(this.allData.resultWithQualifier , 'BPET'));
        this.PPETArrayBarData = this.formatTobarChart(this.formatTo(this.allData.resultWithQualifier , 'PPET'));
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
      });
  }

  formatTo(data, catName) {
    let result = [];
    for (let i = 0; i < data.length; i ++) {
      if (data[i].testCatogiryName === catName) {
        result.push(data[i]);
      }
    }
    return result;
  }

  formatTobarChart(resultWiseData) {
    let groups = {};
    for (let i = 0; i < resultWiseData.length; i++) {
      const groupName = resultWiseData[i].testName;
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push({'name': resultWiseData[i].testResult, 'value': resultWiseData[i].count});
    }
    resultWiseData = [];
    for (const groupName in groups) {
      if (true) {
        resultWiseData.push({name: groupName, series: groups[groupName]});
      }
    }
    console.log(JSON.stringify(resultWiseData));
    return resultWiseData;
    // this.testBarChartData = resultWiseData;
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

  startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = this.checkTime(m);
    s = this.checkTime(s);
    this.currentTime = h + ':' + m + ':' + s;
    setTimeout (() => {
      this.startTime();
    }, 1000);
  }

  checkTime(i) {
    if (i < 10) {i = '0' + i; }  // add zero in front of numbers < 10
    return i;
  }

}
