import { Injectable } from '@angular/core';
import {Headers, Response} from "@angular/http";
import {Project} from "./Project.interface";
import {HttpService} from "../../globalservices/http.service";

@Injectable()
export class ProjectService {

  constructor(private http: HttpService) { }
  getProjects() {
    return this.http.get('/app/staffHome/projects/projects.json')
      .toPromise()
      .then(res =>< Project[] > res.json().data)
      .then(data => { return data; });
  }
}
