import { Component, OnInit } from '@angular/core';
import {single} from './data';
declare var AmCharts:any;
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  single: any[];
  multi: any[];

  view: any[] = [500, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor() { 
    Object.assign(this, {single})      
  
  }

  ngOnInit() {
    AmCharts.makeChart("chartdiv", {
      "type": "pie",
      "theme": "light",
      "allLabels": [{
        "text": "70%",
        "align": "center",
        "font-size": "30px",
        "bold": true,
        "y": 220
      }, {
        "text": "Positive",
        "align": "center",
        "bold": false,
        "y": 250
      }],
      "dataProvider": [{
        "title": "New",
        "value": 4852,
        "color": "#67b7dc"
      }, {
        "title": "Returning",
        "value": 9899,
        "color": "#67b7dc"
      }],
      "titleField": "title",
      "valueField": "value",
      "labelRadius": -130,
      "radius": "42%",
      "innerRadius": "60%",
      "labelText": ""
    });
  }

}
