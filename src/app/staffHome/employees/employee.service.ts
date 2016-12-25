import {Injectable, EventEmitter} from '@angular/core';
import { Headers, Response} from "@angular/http";
import {HttpService} from "../../globalservices/http.service";

@Injectable()
export class EmployeeService {
    private data: string[] = [];
  empDetailedViewComponent_empId = new  EventEmitter<string>();
  constructor(private http: HttpService) { }
  getAllEmployeeDetails(){
    const headersSend = new Headers({'Content-Type':'application/json'});
    return this.http.get("/tep/empprsnlinfo/allemployees",{headers: headersSend}).map(
      (res:Response)=> {
        console.log("getting all employees ",res.json());
        return res.json();
      }
    );
  }

  getempDetailedViewComponent_empId(empId: string){
    this.empDetailedViewComponent_empId.emit(empId);
  }


  getFullEmployeeDtlsById(empId){
    console.log("into getFullEmployeeDtlsById method");
    const headersSend = new Headers({'Content-Type':'application/json'});
    const candBody = {empId : empId };
    console.log("empId in bodySend",candBody);
    console.log("empId in headersSend",headersSend);
    return this.http.post("/tep/empdetailedviewbyid",candBody,{headers: headersSend}).map(
      (res:Response)=> {
        console.log("res.json from getemployeepersonalinfo By id",res.json());
        return res.json();
      }
    );
  }

}
