import { Injectable } from '@angular/core';
import { AppSettings } from '../../../apiUrl';
import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminListService {

  constructor(private httpClient: HttpClient) { }

  getAllAdminList() {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `SuperVisors?filter={"include":"appointment1"}`)
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

  getAllAppointments() {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `appointments`)
      .map((res: Response) => res);
  }

  checkAppointment(id) {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `SuperVisors/count?where={"appointmentId":` + JSON.stringify(id) + `}`)
      .map((res: Response) => res);
  }

  getRankCategorys() {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `rankCatogiries`)
      .map((res: Response) => res);
  }

  uploadPic(formData) {
    return this.httpClient.post(AppSettings.API_ENDPOINT + `awsS3s/jawaan/upload`, formData)
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
    return this.httpClient.get(AppSettings.API_ENDPOINT + `TestResults/getReportsByRankIdsAndRankCatogiry?rankIds=`
      + JSON.stringify(rankArray) + `&rankCatogiryIds=` + rankcatId)
      .map((res: Response) => res);
  }

  getAllReportByCandidate(ranCatogs, ranks, subunits, testCategories, testTypes, fDate, tDate, resultArray) {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `TestResults/getTestResultsByCanditate?rankCatogiries=`
      + JSON.stringify(ranCatogs) + `&ranks=` + JSON.stringify(ranks) + `&subUnit=` + JSON.stringify(subunits) +
      '&testCatogiries=' + JSON.stringify(testCategories) +
      '&testTypes=' + JSON.stringify(testTypes) + '&testResult=' + JSON.stringify(resultArray) +
      `&startDate=` + fDate + `&endDate=` + tDate)
      .map((res: Response) => res);
  }
  
  getAllFilteredData(ranCatogs, ranks, subunits, testCategories, testTypes, fDate, tDate, resultArray) {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `TestResults/getFilteredReport?rankCatogiries=`
      + JSON.stringify(ranCatogs) + `&ranks=` + JSON.stringify(ranks) + `&subUnit=` + JSON.stringify(subunits) +
      '&testCatogiries=' + JSON.stringify(testCategories) +
      '&testTypes=' + JSON.stringify(testTypes) + '&testResult=' + JSON.stringify(resultArray) +
      `&startDate=` + fDate + `&endDate=` + tDate)
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

  getAllDateWiseReports(fDate, tDate) {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `TestResults/getReportsByDates?startDate=`
      + fDate + `&endDate=` + tDate)
      .map((res: Response) => res);
  }

  getBPETTestTypes() {
    const id = '5b0ba2c9b6ded61e80440114';
    return this.httpClient.get
      (AppSettings.API_ENDPOINT + `TestTypes?filter={"where":{"catogiryId":"` +
      id + '"' + ',' + `"status":"` + 'active' + `"}}`)
      .map((res: Response) => res);
  }

  getPPETTestTypes() {
    return this.httpClient.get
      (AppSettings.API_ENDPOINT + `TestTypes?filter={"where":{"catogiryId":"` +
      '5b0ba2d8b6ded61e80440115' + '"' + ',' + `"status":"` + 'active' + `"}}`)
      .map((res: Response) => res);
  }

  gettestTypesData(cId, tId, eDate, sDate) {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `Canditates/getCanditateDashBoard?armyNumber=`
      + cId + `&testType=` + tId + `&startDate=` + JSON.stringify(sDate) + `&endDate=` + JSON.stringify(eDate))
      .map((res: Response) => res);
  }

}
