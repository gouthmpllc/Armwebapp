import { Injectable } from '@angular/core';
import { AppSettings } from '../../../apiUrl';
import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminListService {

  constructor(private httpClient: HttpClient) { }

  getAllAdminList() {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `SuperVisors`)
    .map((res: Response) => res);
  }

  getCurrentAdminList(userName) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `SuperVisors?filter={"where":{"username":"` + userName + `"}}`)
    .map((res: Response) => res);
  }

  getAllRanks() {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `ranks`)
    .map((res: Response) => res);
  }

  getRankCategorys() {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `rankCatogiries`)
    .map((res: Response) => res);
  }

  getAllSubUnits() {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `SubUnits`)
    .map((res: Response) => res);
  }

  createAdmin(newAdmin) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `SuperVisors`, newAdmin)
    .map((res: Response) => res);
  }

  updateAdmin(updateAdmin) {
    return this.httpClient.put(AppSettings.API_ENDPOINT + `SuperVisors/` + updateAdmin.id, updateAdmin)
    .map((res: Response) => res);
  }

  deleteAdmin(admin) {
    return this.httpClient.delete(AppSettings.API_ENDPOINT + `SuperVisors/` + admin.id)
    .map((res: Response) => res);
  }

  createCandidate(newCandidate) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `Canditates`, newCandidate)
    .map((res: Response) => res);
  }

  updateCandidate(candidate) {
    return this.httpClient.put(AppSettings.API_ENDPOINT + `Canditates/` + candidate.id, candidate)
    .map((res: Response) => res);
  }


  // reports---
  // getAllCategoryWiseReports(catArray, rankArray) {
  //   return this.httpClient.get(AppSettings.API_ENDPOINT + `TestResults/getReportsByCatogiryAndRanksIds?catogiries=`
  //   + JSON.stringify(catArray) + `&ranks=` + JSON.stringify(rankArray))
  //   .map((res: Response) => res);
  // }

  getAllCategoryWiseReports(rankcatId, rankArray) {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `TestResults//getReportsByRankIdsAndRankCatogiry?rankIds=`
    + JSON.stringify(rankArray) + `&rankCatogiryIds=` + rankcatId)
    .map((res: Response) => res);
  }

  getAllWingWiseReports(subUnitsArray) {
    // console.log('nnnnnnnn' + JSON.stringify(subUnitsArray));
    return this.httpClient.get(AppSettings.API_ENDPOINT + 'TestResults/getReportsBySubunitIds?subUnitIds=' + JSON.stringify(subUnitsArray))
    .map((res: Response) => res);
  }

  getAllTestTypeWiseReports(catId, typeArray) {
    // return this.httpClient.get(AppSettings.API_ENDPOINT + 'TestResults/getReportsByTestTypeIdsAndTestCategory?testTypeIds=' +
    // JSON.stringify(typeArray))
    // .map((res: Response) => res);
    return this.httpClient.get(AppSettings.API_ENDPOINT + 'TestResults/getReportsByTestTypeIdsAndTestCategory?testTypeIds=' +
    JSON.stringify(typeArray) + `&testCatIds=` + catId)
    .map((res: Response) => res);
  }
}
