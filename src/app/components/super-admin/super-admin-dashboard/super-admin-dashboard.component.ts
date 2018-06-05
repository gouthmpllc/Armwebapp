import { Component, OnInit } from '@angular/core';
import {single} from '../../admin/admin-dashboard/data';
import { SuperAdminSettingsService } from '../../../services/superAdmin/settings-service/super-admin-settings.service';
import { AdminListService } from '../../../services/superAdmin/admin-list-service/admin-list.service';
declare var AmCharts: any;

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.css']
})
export class SuperAdminDashboardComponent implements OnInit {
  allData: any;
  data: any = [];
  single: any[];
  multi: any[];
  testBarChartData: any = [];
  view: any[] = [600, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Test Name';
  showYAxisLabel = true;
  yAxisLabel = 'Test Results';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FF0000']
  };

  public rowsOnPage = 10;
  public sortBy = 'createdAt';
  public sortOrder = 'desc';

  constructor(private superAdminSettingsService: SuperAdminSettingsService, private adminListService: AdminListService) {
    Object.assign(this, {single});
  }

  ngOnInit() {
    this.loadDashBoardData();
    this.loadAllAdmins();
    AmCharts.makeChart('chartdiv', {
      'type': 'pie',
      'theme': 'light',
      'allLabels': [{
        'text': '70%',
        'align': 'center',
        'font-size': '30px',
        'bold': true,
        'y': 220
      }, {
        'text': 'Positive',
        'align': 'center',
        'bold': false,
        'y': 250
      }],
      'dataProvider': [{
        'title': 'New',
        'value': 4852,
        'color': '#67b7dc'
      }, {
        'title': 'Returning',
        'value': 9899,
        'color': '#67b7dc'
      }],
      'titleField': 'title',
      'valueField': 'value',
      'labelRadius': -130,
      'radius': '42%',
      'innerRadius': '0%',
      'labelText': ''
    });
  }

  // formatting;
  loadDashBoardData() {
    this.superAdminSettingsService.getAllDashboardData().subscribe(
      (data: any) => {
        console.log(JSON.stringify(data));
        this.allData = data.data.data;
        this.formatTobarChart(this.allData.resultWithQualifier);
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
      });
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
    for (let groupName in groups) {
      resultWiseData.push({name: groupName, series: groups[groupName]});
    }
    console.log(JSON.stringify(resultWiseData));
    this.testBarChartData = resultWiseData;
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
}
