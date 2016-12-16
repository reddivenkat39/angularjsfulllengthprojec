import { Injectable } from '@angular/core';
import { Headers, Response} from "@angular/http";
import {HttpService} from "../../globalservices/http.service";

@Injectable()
export class EmployeeService {

  constructor(private http: HttpService) { }

  getAllEmployeeDetails(){
    const headersSend = new Headers({'Content-Type':'application/json'});
    return this.http.get("http://10.10.5.55:8080/empprsnlinfo/allemployees",{headers: headersSend}).map(
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
    return this.http.post("http://10.10.5.55:8080/empprsnlinfo/empbyid",candBody,{headers: headersSend}).map(
      (res:Response)=> {
        console.log("res.json from getemployeepersonalinfo By id",res.json());
        return res.json();
      }
    );
  }
  getEmpWorkAddressById(empId){
    console.log("into getDetailedViewEachEmployee method for work address details");
    const headersSend = new Headers({'Content-Type':'application/json'});
    const candBody = {empId : empId };
    console.log("empId in bodySend",candBody);
    console.log("empId in headersSend",headersSend);
    return this.http.post("http://10.10.5.55:8080/empclirel/workaddrbyempid",candBody,{headers: headersSend}).map(
      (res:Response)=> {
        console.log("res.json from get employee work address By id",res.json());
        return res.json();
      }
    );

  }
  getEmpMoreInfoById(empId){
    console.log("into getDetailedViewEachEmployee method for more info details");
    const headersSend = new Headers({'Content-Type':'application/json'});
    const candBody = {empId : empId };
    console.log("empId in bodySend",candBody);
    console.log("empId in headersSend",headersSend);
    return this.http.post("http://10.10.5.55:8080/empmoreinfo/byempid",candBody,{headers: headersSend}).map(
      (res:Response)=> {
        console.log("res.json from get employee more details By id",res.json());
        return res.json();
      }
    );
  }


}
