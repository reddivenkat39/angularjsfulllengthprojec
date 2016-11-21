import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Employee} from "./employee.interface";

@Injectable()
export class DatatableService {

  constructor(private http: Http) { }
  getEmployeeDetails(){
    return this.http.get('/app/staffHome/candidates/datatable/employee.json')
      .toPromise()
      .then(res=><Employee[]>res.json().data)
      .then(data =>{return data;});
  }

}
