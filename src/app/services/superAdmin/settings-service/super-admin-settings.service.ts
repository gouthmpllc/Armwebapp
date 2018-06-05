import { Injectable } from '@angular/core';
import { AppSettings } from '../../../apiUrl';
import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import 'rxjs/add/operator/map';

@Injectable()
export class SuperAdminSettingsService {

  constructor(private httpClient: HttpClient) { }

  getTestCategories() {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `TestCatogiries`)
    .map((res: Response) => res);
  }

  createTestCategories(newCategory) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `TestCatogiries`, newCategory)
    .map((res: Response) => res);
  }

  updateCategory(category) {
    return this.httpClient.put(AppSettings.API_ENDPOINT + `TestCatogiries/` + category.id, category)
    .map((res: Response) => res);
  }

  deleteCategory(category) {
    return this.httpClient.delete(AppSettings.API_ENDPOINT + `TestCatogiries/` + category.id)
    .map((res: Response) => res);
  }

  getAgeRanges() {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `ageRanges`)
    .map((res: Response) => res);
  }

  getTestType() {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `TestTypes`)
    .map((res: Response) => res);
  }

  createTestTypes(newTypeName) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `TestTypes`, newTypeName)
    .map((res: Response) => res);
  }

}
