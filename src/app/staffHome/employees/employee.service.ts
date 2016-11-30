import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";

@Injectable()
export class EmployeeService {

  constructor(private http: Http) { }

  getAllEmployeeDetails(){
    const headersSend = new Headers({'Content-Type':'application/json'});
    return this.http.get("http://localhost:8080/getemployeepersonalinfo",{headers: headersSend}).map(
      (res:Response)=> {
        console.log("getting all employees ",res.json());
        return res.json();
      }
    );
  }
  getDetailedViewEachEmployee(){
    console.log("get detailed view of each employee invoked");
    const headersSend = new Headers({'Content-Type':'application/json'});
    return this.http.get("http://localhost:8080/getemployeepersonalinfo",{headers: headersSend}).map(
      (res:Response)=> {
        console.log("getting each employee details",res.json());
        return res.json();
      }
    );
  }



}
