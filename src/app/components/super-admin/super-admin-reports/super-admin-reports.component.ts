import { Component, OnInit } from '@angular/core';
import { AdminListService } from '../../../services/superAdmin/admin-list-service/admin-list.service';
import { SuperAdminSettingsService } from '../../../services/superAdmin/settings-service/super-admin-settings.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

@Component({
  selector: 'app-super-admin-reports',
  templateUrl: './super-admin-reports.component.html',
  styleUrls: ['./super-admin-reports.component.css']
})
export class SuperAdminReportsComponent implements OnInit {
  wingStatus: boolean;
  typeStatus: boolean;
  data: any = [];
  testCategories: any = [];
  allSubUnits: any = [];
  allRanks: any = [];
  categoryStatus: boolean;
  filter: any = {};
  subArray: any = [];
  categoryArray: any = [];
  rankArray: any = [];
  typeArray: any = [];
  testTypes: any = [];
  allRankCategories: any = [];
  dupRanks: any = [];
  rankCategory: any = '';
  selectedcCategoryId: any = '';
  dupTestTypes: any = [];

  public rowsOnPage = 10;
  public sortBy = 'createdAt';
  public sortOrder = 'desc';
  constructor(private adminListService: AdminListService, private superAdminSettingsService: SuperAdminSettingsService) { }

  ngOnInit() {
    this.loadCategorywiseReports([], []);
    this.loadTestCategories();
    this.loadSubUnits();
    this.loadTestTypes();
    this.loadArmyRanks();
    this.loadRankCategorys();
    this.categoryStatus = true;
  }

  loadCategorywiseReports(catArray, rkArray) {
    this.data = [];
    this.adminListService.getAllCategoryWiseReports(catArray, rkArray).subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.data = data.data.data;
        if (this.data.length > 0) {
          alert('Generated successfully');
        } else {
          alert('No Data Found');
        }
      },
      error => {
        console.log(JSON.stringify(error));
    });
  }

  loadTestTypes() {
    this.superAdminSettingsService.getTestType().subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.testTypes = data.data;
        this.dupTestTypes = data.data;
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!'); getTestType
      });
  }

  loadTestCategories() {
    this.superAdminSettingsService.getTestCategories().subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.testCategories = data.data;
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

  loadArmyRanks() {
    this.adminListService.getAllRanks().subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.allRanks = data.data;
        this.dupRanks = data.data;
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
    });
  }

  setRanks(id) {
    this.rankArray = [];
    this.allRanks = this.dupRanks;
    let result: any = [];
    this.allRanks.filter(rank => {
      if (id === rank.rankCatgId) {
        result.push(rank);
      }
    });
    this.allRanks = [];
    this.allRanks = result;
    // console.log(JSON.stringify(this.allRanks));
  }

  setTestTypes(id) {
    this.typeArray = [];
    this.testTypes = this.dupTestTypes;
    let result: any = [];
    this.testTypes.filter(type => {
      if (id === type.catogiryId) {
        result.push(type);
      }
    });
    this.testTypes = [];
    this.testTypes = result;
    console.log(JSON.stringify(this.allRanks));
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

  loadWingwiseReports(subUnit) {
    this.data = [];
    this.adminListService.getAllWingWiseReports(subUnit).subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.data = data.data.data;
        if (this.data.length > 0) {
          alert('Generated successfully');
        } else {
          alert('No Data Found');
        }
      },
      error => {
        console.log(JSON.stringify(error));
    });
  }

  loadTestTypewiseReports(catId, typeArray) {
    this.data = [];
    this.adminListService.getAllTestTypeWiseReports(catId, typeArray).subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.data = data.data.data;
        if (this.data.length > 0) {
          alert('Generated successfully');
        } else {
          alert('No Data Found');
        }
      },
      error => {
        console.log(JSON.stringify(error));
    });
  }

  setCategoryWiseReports() {
    this.resetFilters();
    this.categoryStatus = true;
    this.loadCategorywiseReports([], []);
  }

  setWingWiseReports() {
    this.resetFilters();
    this.wingStatus = true;
    this.loadWingwiseReports([]);
  }

  setTestTypeWiseReports() {
    this.resetFilters();
    this.typeStatus = true;
    this.loadTestTypewiseReports('', []);
  }


  resetFilters() {
    this.subArray = [];
    this.categoryArray = [];
    this.rankArray = [];
    this.typeArray = [];
    this.rankCategory = '';
    this.selectedcCategoryId = '';
    this.wingStatus = false;
    this.categoryStatus = false;
    this.typeStatus = false;
  }

  geneeateWingWiseFilterArray() {
    // console.log(JSON.stringify(this.subArray));
    this.loadWingwiseReports(this.subArray);
  }

  // geneeateCategoryWiseFilterArray() {
  //   this.loadCategorywiseReports(this.categoryArray, this.rankArray);
  // }

  geneeateCategoryWiseFilterArray() {
    this.loadCategorywiseReports(this.rankCategory, this.rankArray);
  }

  geneeateTestTypeWiseFilterArray() {
    this.loadTestTypewiseReports(this.selectedcCategoryId, this.typeArray);
  }

  generateCsv() {
    let options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      noDownload: false,
      headers: ['armyNumber', 'Name', 'gender', 'age', 'sNo',
      'rank', 'subunit', 'catogiryName', 'testName', 'testResult', 'candTestDate', 'createdAt']
    };
    new Angular5Csv(this.data, 'report', options);
  }

}
