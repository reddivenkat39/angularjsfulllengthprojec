import { Injectable } from '@angular/core';
import {Headers, Response} from "@angular/http";
import {HttpService} from "../../../globalservices/http.service";

@Injectable()
export class EmpCrudTabsService {

  constructor(private http: HttpService) { }

  getEmpEduDtlsByEmpId(empId){
    console.log("into getEmpEduDtlsByEmpId method");
    const headersSend = new Headers({'Content-Type':'application/json'});
    const empIdBody = {empId : empId };
    console.log("empId in bodySend",empId);
    console.log("empId in headersSend",headersSend);
    return this.http.post("http://localhost:8080/empedu/edudata",empIdBody,{headers: headersSend}).map(
      (res:Response)=> {
        console.log("res.json from /empedu/edudata By id",res.json());
        return res.json();
      }
    );
  }


}
