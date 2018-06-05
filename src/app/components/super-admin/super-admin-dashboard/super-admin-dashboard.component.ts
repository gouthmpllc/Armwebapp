import { Component, OnInit } from '@angular/core';
import {single} from '../../admin/admin-dashboard/data';
import { SuperAdminSettingsService } from '../../../services/superAdmin/settings-service/super-admin-settings.service';
declare var AmCharts: any;

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.css']
})
export class SuperAdminDashboardComponent implements OnInit {
  allData: any;

  single: any[];
  multi: any[];
  testBarChartData: any = [];
  view: any[] = [500, 300];

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
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private superAdminSettingsService: SuperAdminSettingsService) {
    Object.assign(this, {single});

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
      'innerRadius': '60%',
      'labelText': ''
    });
  }

  ngOnInit() {
    this.loadDashBoardData();
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
}
