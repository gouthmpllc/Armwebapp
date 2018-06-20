import { Injectable } from '@angular/core';
import { AppSettings } from '../../../apiUrl';
import { HttpClient } from '@angular/common/http';
import { Http, Response, RequestOptions } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CandidateListService {

  constructor(private httpClient: HttpClient) { }

  getAllCandidateList() {
    return this.httpClient.get(AppSettings.API_ENDPOINT + `Canditates?filter={"include":"superVisor"}`)
    .map((res: Response) => res);
  }

  updateCandidate(candidate) {
    return this.httpClient.put(AppSettings.API_ENDPOINT + `Canditates/` + candidate.id, candidate)
    .map((res: Response) => res);
  }

  deleteCandidate(candidate) {
    return this.httpClient.delete(AppSettings.API_ENDPOINT + `Canditates/` + candidate.id)
    .map((res: Response) => res);
  }

  getCurrentCandidateList(id) {
    return this.httpClient.get
    (AppSettings.API_ENDPOINT + `Canditates?filter={"where":{"candArmyNum":"` + id + `"}}`)
    .map((res: Response) => res);
  }

}
