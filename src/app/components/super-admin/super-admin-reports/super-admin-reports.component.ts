import { Component, OnInit } from '@angular/core';
import { AdminListService } from '../../../services/superAdmin/admin-list-service/admin-list.service';
import { SuperAdminSettingsService } from '../../../services/superAdmin/settings-service/super-admin-settings.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-super-admin-reports',
  templateUrl: './super-admin-reports.component.html',
  styleUrls: ['./super-admin-reports.component.css']
})
export class SuperAdminReportsComponent implements OnInit {
  testTypeResultOptions: any = [];
  dupTestTypeOption: any = [];
  displayTwoDate: boolean;
  displayOneDate: boolean;
  dateWiseStatus: boolean;
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
  rankCategory: any = [];
  selectedcCategoryId: any = [];
  dupTestTypes: any = [];
  fromDate: any;
  toDate: any;
  maxDate = new Date();
  dateRa = [{ name: 'Date', value: 1 }, { name: 'Date Range', value: 2 }];
  raId: any;
  public rowsOnPage = 10;
  public sortBy = 'createdAt';
  public sortOrder = 'desc';
  searchQuery: string;
  resultArray: any = [];
  loadingStatus: boolean;

  constructor(private adminListService: AdminListService, private superAdminSettingsService: SuperAdminSettingsService) { }

  ngOnInit() {
    this.loadCategorywiseReports([], []);
    this.loadTestCategories();
    this.loadSubUnits();
    this.loadTestTypes();
    this.loadArmyRanks();
    this.loadRankCategorys();
    this.loadTestTypeResultOptions();
    this.categoryStatus = true;
    this.displayOneDate = true;
    this.raId = 1;
  }

  loadCategorywiseReports(catArray, rkArray) {
    this.loadingStatus = true;
    this.data = [];
    this.adminListService.getAllCategoryWiseReports(catArray, rkArray).subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.loadingStatus = false;
        this.data = data.data.data;
        if (this.data.length > 0) {
          // alert('Generated successfully');
        } else {
          alert('No Data Found');
        }
      },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  loadTestTypeResultOptions() {
    this.superAdminSettingsService.getTestTypeResultOptions().subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.dupTestTypeOption = data.data;
        this.testTypeResultOptions = data.data;
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
      });
  }

  loadFilteredData(ranCatogs, ranks, subunits, testCategories, testTypes, fDate, tDate, resultArray) {
    this.data = [];
    this.loadingStatus = true;
    this.adminListService.getAllFilteredData(ranCatogs, ranks, subunits, testCategories, testTypes,
      fDate, tDate, resultArray).subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.loadingStatus = false;
        this.data = data.data.data;
        if (this.data.length > 0) {
          // alert('Generated successfully');
        } else {
          // alert('No Data Found');
        }
      },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  resetAll(FilterForm: NgForm) {
    this.data = [];
    this.resetFilters();
    this.loadCategorywiseReports([], []);
    // FilterForm.resetForm();

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
    if (id.length == 0) {
      this.allRanks = this.dupRanks;

    } else {
      this.allRanks.filter(rank => {
        if (id.indexOf(rank.rankCatgId) >= 0) {
          result.push(rank);
        }
      });
      this.allRanks = [];
      this.allRanks = result;
    }


    // console.log(JSON.stringify(this.allRanks));
  }

  setTestTypes(id) {
    this.typeArray = [];
    this.testTypes = this.dupTestTypes;
    let result: any = [];
    console.log('test cat Ids ' + JSON.stringify(id));

    if (id.length > 0) {
      this.testTypes.filter(type => {
        if (id.indexOf(type.catogiryId) >= 0) {
          result.push(type);
        }
      });
      this.testTypes = [];
      this.testTypes = result;
    } else {
      this.testTypes = this.dupTestTypes;
    }

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
          // alert('Generated successfully');
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
          // alert('Generated successfully');
        } else {
          alert('No Data Found');
        }
      },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  loaddatewiseReports(fDate, tDate) {
    this.data = [];
    this.adminListService.getAllDateWiseReports(fDate, tDate).subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.data = data.data.data;
        if (this.data.length > 0) {
          // alert('Generated successfully');
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

  setDateWise() {
    this.resetFilters();
    this.dateWiseStatus = true;
    this.displayOneDate = true;
    this.raId = 1;
  }

  setParticularDate(id) {
    this.resetFilters();
    this.dateWiseStatus = true;
    if (id === 1) {
      this.displayOneDate = true;
      this.displayTwoDate = false;
    } else {
      this.displayTwoDate = true;
    }
  }


  resetFilters() {
    this.subArray = [];
    this.categoryArray = [];
    this.rankArray = [];
    this.typeArray = [];
    this.resultArray = [];
    this.rankCategory = [];
    this.selectedcCategoryId = [];
    this.wingStatus = false;
    this.categoryStatus = false;
    this.typeStatus = false;
    this.displayOneDate = true;
    // this.raId = 1;
    this.displayTwoDate = false;
    this.fromDate = '';
    this.toDate = '';
  }

  geneeateWingWiseFilterArray() {
    // console.log(JSON.stringify(this.subArray));
    this.loadWingwiseReports(this.subArray);
  }

  // geneeateCategoryWiseFilterArray() {
  //   this.loadCategorywiseReports(this.categoryArray, this.rankArray);
  // }

  geneeateCategoryWiseFilterArray() {
    // this.loadCategorywiseReports(this.rankCategory, this.rankArray);
    if (!this.toDate && this.raId === 1) {
      this.toDate = this.fromDate;
    }
    console.log(this.fromDate);
    console.log(this.toDate);
    let result = [];
    if (this.subArray.length > 0) {
      for (let i = 0; i < this.subArray.length; i++ ) {
        result.push(this.subArray[i].id);
      }
    }
    this.loadFilteredData(this.rankCategory, this.rankArray, result, this.selectedcCategoryId,
      this.typeArray, this.fromDate, this.toDate, this.resultArray);

  }

  geneeateTestTypeWiseFilterArray() {
    this.loadTestTypewiseReports(this.selectedcCategoryId, this.typeArray);
  }

  geneeateDateWiseFilterArray() {
    if (this.raId === 1) {
      this.toDate = '';
    }
    if (!this.toDate && this.raId === 1) {
      this.toDate = this.fromDate;
    }
    let result = [];
    if (this.subArray.length > 0) {
      for (let i = 0; i < this.subArray.length; i++ ) {
        result.push(this.subArray[i].id);
      }
    }

    this.loadFilteredData(this.rankCategory, this.rankArray, result, this.selectedcCategoryId,
      this.typeArray, this.fromDate, this.toDate, this.resultArray);

    // this.loaddatewiseReports(this.fromDate, this.toDate);
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
        'rank', 'subunit', 'catogiryName', 'testName', 'testResult', 'conductedBy' , 'candTestDate', 'createdAt']
    };
    new Angular5Csv(this.data, 'report', options);
  }

  filterByRank() {
    console.log('clicked on filter By Rank');
  }

  equals(objOne, objTwo) {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.id === objTwo.id;
    }
  }

  selectAll(select: NgModel, values, array) {
    select.update.emit(values);
  }

  deselectAll(select: NgModel) {
    select.update.emit([]);
  }

}
