import { Component, OnInit } from '@angular/core';
import { SuperAdminSettingsService } from '../../../services/superAdmin/settings-service/super-admin-settings.service';
import { NgForm } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-super-admin-settings',
  templateUrl: './super-admin-settings.component.html',
  styleUrls: ['./super-admin-settings.component.css']
})
export class SuperAdminSettingsComponent implements OnInit {
  displayTestTypeUpdateBtn: boolean;
  CatId: any;
  CatName: any;
  displayCategoryUpdateBtn: boolean;
  category: any = {};
  testType: any = {};
  testCategories: any = [];
  testTypes: any [];
  ageRanges: any [];
  ageGroup: any = [];
  optionGroup: any = [];
  testTypeResultOptions: any = [];
  ageId: any = [];
  optionId: any = [];
  dupTestTypeOption: any = [];
  dupAgeTypeOption: any = [];
  constructor(private superAdminSettingsService: SuperAdminSettingsService, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
   };
  }

  ngOnInit() {
    this.loadTestCategories();
    this.loadTestTypes();
    this.loadAgeRanges();
    this.testType.catogiryId = null;
    this.loadTestTypeResultOptions();
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

  loadTestTypes() {
    this.superAdminSettingsService.getTestType().subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.testTypes = data.data;
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!'); getTestType
      });
  }

  loadAgeRanges() {
    this.superAdminSettingsService.getAgeRanges().subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        this.dupAgeTypeOption = data.data;
        this.ageRanges = data.data;
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
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

  createCategory(addCategoryForm: NgForm) {
    this.category['status'] = 'active';
    console.log(JSON.stringify(this.category));
    this.superAdminSettingsService.createTestCategories(this.category).subscribe(
      (data: any) => {
        // console.log(JSON.stringify(data));
        addCategoryForm.resetForm();
        alert('Category Created Successfully');
        this.loadTestCategories();
      },
      error => {
        console.log(JSON.stringify(error));
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
      });
  }

  ageGroupArray(event, selectedAge, index) {
    if (event.target.checked) {
      this.ageGroup.push(selectedAge.id);
    } else {
      const index = this.ageGroup.findIndex(data => data === selectedAge.id);
      // this.studentIdArray.splice(index, 1);
      this.ageGroup.splice(index, 1);
    }
    console.log(JSON.stringify(this.ageGroup));
  }

  testOtionArray(event, selectedOp, index) {
    if (event.target.checked) {
      this.optionGroup.push(selectedOp.id);
    } else {
      const index = this.optionGroup.findIndex(data => data === selectedOp.id);
      this.optionGroup.splice(index, 1);
    }
    console.log(JSON.stringify(this.optionGroup));
  }



  setCategory(id) {
    for (let i = 0; i < this.testCategories.length; i++) {
      if (id === this.testCategories[i].id ) {
        this.CatName = this.testCategories[i].catogiryName;
        this.CatId = this.testCategories[i].id;
        return;
      }
    }
  }

  createTestType(addTestTypeForm: NgForm) {
    this.testType.catogiryName  = this.CatName;
    this.testType.catogiryId = this.CatId;
    this.testType.ageGroup = this.ageGroup;
    this.testType.optionGroup = this.optionGroup;
    this.testType.status = 'active';
    delete this.testType.ageId;
    console.log(JSON.stringify(this.testType));
    this.superAdminSettingsService.createTestTypes(this.testType).subscribe(
      (data: any) => {
        alert('TestType Created Successfully');
        this.ageGroup = [];
        this.optionGroup = [];
        this.ageId = [];
        this.optionId = [];
        this.CatId  = '';
        // this.ageGroup = '';
        addTestTypeForm.resetForm();
        this.loadTestTypes();
      },
      error => {
        console.log(JSON.stringify(error));
        alert('Server Not Found');
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
    });
  }

  setCategoryActive(category) {
    category.status = 'active';
    this.editTestCategories(category);
  }

  setCategoryInActive(category) {
    category.status = 'inactive';
    this.editTestCategories(category);
  }

  setEditObj(category) {
    this.category = category;
    this.displayCategoryUpdateBtn = true;
  }

  updateCategory(addCategoryForm: NgForm) {
    this.editTestCategories(this.category);
    addCategoryForm.resetForm();
  }

  removeCategory(category) {
    if (confirm('Are You Sure?')) {
      this.superAdminSettingsService.deleteCategory(category).subscribe(
        (data: any) => {
          alert('Deleted Successfully');
          this.loadTestCategories();
        },
        error => {
          console.log(JSON.stringify(error));
          alert('Server Not Found');
          // this.toastr.error('Invalid Login Credentials!', 'Oops!');
      });
    } else {
      return false;
    }

  }

  editTestCategories(category) {
    // console.log(JSON.stringify(category));
    this.superAdminSettingsService.updateCategory(category).subscribe(
      (data: any) => {
        alert('Updated Successfully');
        this.displayCategoryUpdateBtn = false;
        this.loadTestCategories();
      },
      error => {
        console.log(JSON.stringify(error));
        alert('Server Not Found');
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
    });
  }

  setActiveTestType(testType) {
    testType.status = 'active';
    this.editTestTypes(testType);
  }

  setInActiveTestType(testType) {
    testType.status = 'inactive';
    this.editTestTypes(testType);
  }

  setEditTestType(testType, AddTestTypeForm?: NgForm) {
    this.testType = {};
    this.ageId = [];
    this.optionId = [];
    // AddTestTypeForm.resetForm();
    this.testType = testType;
    console.log(JSON.stringify(testType));
    this.displayTestTypeUpdateBtn = true;
    this.loadageGroupDataWithChecked(testType.ageGroup);
    this.loadoptionGroupDataWithChecked(testType.optionGroup);
  }

  loadoptionGroupDataWithChecked(optionArray) {
    this.testTypeResultOptions = this.dupTestTypeOption;
    this.optionGroup = [];
    if(optionArray) {
      this.optionGroup = optionArray;
      if (optionArray.length > 0) {
        for (let i = 0; i < this.testTypeResultOptions.length; i++) {
          for (let j = 0; j < optionArray.length; j++) {
            if (optionArray[j] === this.testTypeResultOptions[i].id) {
              this.testTypeResultOptions[i].checked = true;
              break;
            } else {
              this.testTypeResultOptions[i].checked = false;
            }
          }
        }
      }
    }

  }

  loadageGroupDataWithChecked(agesArray) {
    this.ageRanges = this.dupAgeTypeOption;
    this.ageGroup = [];
    if (agesArray) {
      this.ageGroup = agesArray;
      if (agesArray.length > 0) {
        for (let i = 0; i < this.ageRanges.length; i++) {
          for (let j = 0; j < agesArray.length; j++) {
            if (agesArray[j] === this.ageRanges[i].id) {
              this.ageRanges[i].checked = true;
              break;
            } else {
              this.ageRanges[i].checked = false;
            }
          }
        }
      }
    }

  }

  updateTestType(addTestTypeForm: NgForm) {
    if (this.CatName && this.CatId) {
      this.testType.catogiryName  = this.CatName;
      this.testType.catogiryId = this.CatId;
    }
    if (this.ageGroup.length > 0) {
      this.testType.ageGroup  = this.ageGroup;
    }
    if (this.optionGroup.length > 0) {
      this.testType.optionGroup  = this.optionGroup;
    }
    this.editTestTypes(this.testType, addTestTypeForm);
  }

  editTestTypes(testType, formName?) {
    this.superAdminSettingsService.updateTestType(testType).subscribe(
      (data: any) => {
        alert('Updated Successfully');
        this.displayTestTypeUpdateBtn = false;
        this.ageGroup = [];
        this.optionGroup = [];
        this.ageId = [];
        this.optionId = [];
        this.testType = {};
        if (formName) {
          formName.resetForm();
        }
        this.router.navigated = false;
        this.router.navigate(['superAdmin/configuration']);
        this.loadTestTypes();
      },
      error => {
        console.log(JSON.stringify(error));
        alert('Server Not Found');
        this.loadTestTypes();
        // this.toastr.error('Invalid Login Credentials!', 'Oops!');
    });
  }

  removeTestType(testType) {
    if (confirm('Are You Sure?')) {
      this.superAdminSettingsService.deleteTestType(testType).subscribe(
        (data: any) => {
          alert('Deleted Successfully');
          this.loadTestTypes();
        },
        error => {
          console.log(JSON.stringify(error));
          alert('Server Not Found');
          // this.toastr.error('Invalid Login Credentials!', 'Oops!');
      });
    } else {
      return false;
    }

  }

}
