import { Component, OnInit } from '@angular/core';
import { SuperAdminSettingsService } from '../../../services/superAdmin/settings-service/super-admin-settings.service';
import { NgForm } from '@angular/forms';

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

  constructor(private superAdminSettingsService: SuperAdminSettingsService) { }

  ngOnInit() {
    this.loadTestCategories();
    this.loadTestTypes();
    this.loadAgeRanges();
    this.testType.catogiryId = null;
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
        this.ageRanges = data.data;
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
      this.ageGroup.splice(index, 1);
    }
    console.log(JSON.stringify(this.ageGroup));
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
    console.log(JSON.stringify(this.testType));
    this.superAdminSettingsService.createTestTypes(this.testType).subscribe(
      (data: any) => {
        alert('TestType Created Successfully');
        this.ageGroup = [];
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

  setEditTestType(testType) {
    this.testType = testType;
    console.log(JSON.stringify(testType));
    this.displayTestTypeUpdateBtn = true;

  }

  updateTestType(addTestTypeForm: NgForm) {
    if (this.CatName && this.CatId) {
      this.testType.catogiryName  = this.CatName;
      this.testType.catogiryId = this.CatId;
    }
    this.editTestTypes(this.testType, addTestTypeForm);
  }

  editTestTypes(testType, formName?) {
    this.superAdminSettingsService.updateTestType(testType).subscribe(
      (data: any) => {
        alert('Updated Successfully');
        this.displayTestTypeUpdateBtn = false;
        if (formName) {
          formName.resetForm();
        }
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
  }

}
