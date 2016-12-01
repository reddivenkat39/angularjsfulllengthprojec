import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";

@Injectable()
export class EmployeeService {

  constructor(private http: Http) { }

  getAllEmployeeDetails(){
    const headersSend = new Headers({'Content-Type':'application/json'});
    return this.http.get("http://10.10.5.55:8080/getemployeepersonalinfo",{headers: headersSend}).map(
      (res:Response)=> {
        console.log("getting all employees ",res.json());
        return res.json();
      }
    );
  }
  getDetailedViewEachEmployee(empId){
    console.log("into getDetailedViewEachEmployee method");
    const headersSend = new Headers({'Content-Type':'application/json'});
    const candBody = {empId : empId };
    console.log("empId in bodySend",candBody);
    console.log("empId in headersSend",headersSend);
    return this.http.post("http://10.10.5.55:8080/getemployeepersonalbyid",candBody,{headers: headersSend}).map(
      (res:Response)=> {
        console.log("res.json from getemployeepersonalinfo By id",res.json());
        return res.json();
      }
    );
  }



}
