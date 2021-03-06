import { Component, OnInit } from '@angular/core';
import { AdminListService } from '../../../services/superAdmin/admin-list-service/admin-list.service';
import { SuperAdminSettingsService } from '../../../services/superAdmin/settings-service/super-admin-settings.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { NgForm, NgModel } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-super-admin-reports',
  templateUrl: './super-admin-reports.component.html',
  styleUrls: ['./super-admin-reports.component.css']
})
export class SuperAdminReportsComponent implements OnInit {
  subRanks: any;
  agerangeSelectAll: boolean;
  tResultSelectAll: boolean;
  rcatgrySelectAll: boolean;
  rankSelectAll: boolean;
  tcategrySelectAll: boolean;
  tTypeSelectAll: boolean;
  sUnitSelectAll: boolean;
  statusSelectAll: boolean;
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
  public sortBy = 'canditateTestDate';
  public sortOrder = 'desc';
  searchQuery: string;
  resultArray: any = [];
  loadingStatus: boolean;
  ageRangeFilter:any= [];
  ageRange =[
    {min:16,max:30},
    {min:30,max:40},
    {min:41,max:45},
    {min:46,max:50},
    {min:51,max:55},
    {min:56,max:60},
  ]
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
    let result = [];
    this.adminListService.getAllReportByCandidateFirst().subscribe(
      (data: any) => {
        this.loadingStatus = false;
        this.data = data.data;
        console.log(JSON.stringify(this.data));

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

  loadFilteredData(ranCatogs, ranks, subunits, testCategories, testTypes, fDate, tDate, resultArray,agesArray) {
    this.data = [];
    this.loadingStatus = true;
    this.adminListService.getAllReportByCandidate(ranCatogs, ranks, subunits, testCategories, testTypes,
      fDate, tDate, resultArray,agesArray).subscribe(
        (data: any) => {
          // console.log(JSON.stringify(data));
          this.loadingStatus = false;
          this.data = data.data;
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
        const ecaxtData = data.data;
        //console.log('134'+ JSON.stringify(this.data))
        // for (let i = 0; i < this.testTypes.length; i++){
        //   const getData = this.data.find(a=> a.) 
        // }
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
      // this.toDate = this.fromDate;
      this.toDate = new Date((this.fromDate.getMonth() + 1) + '/' + (this.fromDate.getDate()) + '/' + (this.fromDate.getFullYear()));
    }
    console.log(this.fromDate);
    console.log(this.toDate);
    
    let rankCategoryModifyArray = this.formatToIds(this.rankCategory);
    let selectedCatgryModifyArray = this.formatToIds(this.selectedcCategoryId);
    let typeArrayModify = this.formatToIds(this.typeArray);
    let resultArrayModify = this.formatToIds(this.resultArray);

    // let agrRangeModifyArray = [];
    // if (array.length > 0) {
    //   for (let i = 0; i < array.length; i++) {
    //     result.push(array[i].id);
    //   }
    // }
    
    let subUnitsModifyArray = this.formatToIds(this.subArray);
    let rankModifyArray = this.formatToIds(this.rankArray);
    
    this.loadFilteredData(rankCategoryModifyArray, rankModifyArray, subUnitsModifyArray, selectedCatgryModifyArray,
      typeArrayModify, this.fromDate, this.toDate, resultArrayModify,this.ageRangeFilter);

  }

  formatToIds(array) {
    let result = [];
    if (array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        result.push(array[i].id);
      }
    }
    return result;
  }

  geneeateTestTypeWiseFilterArray() {
    this.loadTestTypewiseReports(this.selectedcCategoryId, this.typeArray);
  }

  geneeateDateWiseFilterArray() {
    if (this.raId === 1) {
      this.toDate = '';
    }
    if (!this.toDate && this.raId === 1) {
      // this.toDate = this.fromDate;
      this.toDate = new Date((this.fromDate.getMonth() + 1) + '/' + (this.fromDate.getDate()) + '/' + (this.fromDate.getFullYear()));
    }
    let result = [];
    if (this.subArray.length > 0) {
      for (let i = 0; i < this.subArray.length; i++) {
        result.push(this.subArray[i].id);
      }
    }

    this.loadFilteredData(this.rankCategory, this.rankArray, result, this.selectedcCategoryId,
      this.typeArray, this.fromDate, this.toDate, this.resultArray, this.ageRangeFilter);

    // this.loaddatewiseReports(this.fromDate, this.toDate);
  }

  // generateCsv() {
  //   let options = {
  //     fieldSeparator: ',',
  //     quoteStrings: '"',
  //     decimalseparator: '.',
  //     showLabels: true,
  //     showTitle: false,
  //     useBom: true,
  //     noDownload: false,
  //     headers: ['armyNumber', 'Name', 'gender', 'age', 'sNo',
  //       'rank', 'subunit', 'catogiryName', 'testName', 'testResult', 'conductedBy', 'candTestDate', 'createdAt']
  //   };
  //   new Angular5Csv(this.data, 'report', options);
  // }

  convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, dupKeys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    // keys = Object.keys(data[0]);
    keys = ["canditateTestDate","canditateArmyNum","canditateRank","canditateName","canditateDOB",,"canditateAge","nineFt","fiveKM","hRope","twoPfour","hundrMT","fiveMShut","chinUPs","pushUps","sitUps","vRope","sixtyMT","threeKM","outCome","remarks"]

    dupKeys = ["Canditate Test Date","Army Number","Rank","Canditate Name","Date of Birth","Age","9 Ft Ditch","5 KM","H Rope","2.4 KM","100 Mtr Sprint","5M Shuttle","Chin Ups","Push Ups","Sit Ups","V Rope","60 Mtr","3 KM","Outcome","Remarks"]
    // keys = keys.Skip(1).ToArray();
    console.log(JSON.stringify(keys));

    result = '';
    result += dupKeys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
      delete item.data;
      // delete item.canditateTestDate;
        ctr = 0;
        // delete keys[0];
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

generateCsv() {
  var data, filename, link;

  var csv = this.convertArrayOfObjectsToCSV({
    data: this.data
  });
  if (csv == null) return;

  filename = 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);

  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}


// download_csv(csv, filename) {
//   var csvFile;
//   var downloadLink;

//   csvFile = new Blob([csv], { type: "text/csv" });

//   downloadLink = document.createElement("a");


//   downloadLink.download = filename;


//   downloadLink.href = window.URL.createObjectURL(csvFile);


//   downloadLink.style.display = "none";


//   document.body.appendChild(downloadLink);


//   downloadLink.click();
// }

// export_table_to_csv(html, filename) {
//   var csv = [];
//   var rows =  document.querySelectorAll("table tr");

//   for (var i = 0; i < rows.length-1; i++) {
//     var row = [], cols = rows[i].querySelectorAll("td, th");

//     for (var j = 0; j < cols.length; j++){
//       row.push(cols[j].nodeValue);
//     }

//     csv.push(row.join(","));
//   }

//   this.download_csv(csv.join("\n"), filename);
// }

// generateCsv() {
//   var html = document.querySelector("table").outerHTML;
//   this.export_table_to_csv(html, "reports.csv");
// }



  filterByRank() {
    console.log('clicked on filter By Rank');
  }

  equals(objOne, objTwo) {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.id === objTwo.id;
    }
  }

  selectAll(select: NgModel, values, name?) {
  
    if (name === 'sUnit') {
      this.sUnitSelectAll = true;
      select.update.emit(values);
    } else if (name === 'tType'){
      this.tTypeSelectAll = true;
      select.update.emit(values);
    }else if(name === 'tCategry'){
      this.tcategrySelectAll = true;
      select.update.emit(values);
    } else if(name === 'tRank'){
      this.rankSelectAll = true;
      select.update.emit(values);
    } else if(name === 'rCatgry'){
      this.rcatgrySelectAll = true;
      select.update.emit(values);
    } else if(name === 'tResult'){
      this.tResultSelectAll = true;
      select.update.emit(values);
    } else if(name === 'aRange'){
      this.agerangeSelectAll = true;
      select.update.emit(values);
    } 
     
  }

  deselectAll(select: NgModel, name) {
    if (name === 'sUnit') {
      this.sUnitSelectAll = false;
      select.update.emit([]);
    } else if (name === 'tType') {
      this.tTypeSelectAll = false;
      select.update.emit([]);
    }else if(name === 'tCategry'){
      this.tcategrySelectAll = false;
      select.update.emit([]);
    }else if(name === 'tRank'){
      this.rankSelectAll = false;
      select.update.emit([]);
    } else if(name === 'rCatgry'){
      this.rcatgrySelectAll = false;
      select.update.emit([]);
    } else if(name === 'tResult'){
      this.tResultSelectAll = false;
      select.update.emit([]);
    } else if(name === 'aRange'){
      this.agerangeSelectAll = false;
      select.update.emit([]);
    } 
    
  }

}
