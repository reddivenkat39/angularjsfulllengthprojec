import {Injectable} from '@angular/core';
import {Headers, Response} from "@angular/http";
import {HttpService} from "../../globalservices/http.service";

@Injectable()
export class EmpCrudTabsService {

  constructor(private http: HttpService) {
  }

  /*
   to pull the Education Details By Employee Id
   */
  getEmpEduDtlsByEmpId(empId) {
    console.log("into getEmpEduDtlsByEmpId method");
    const headersSend = new Headers({'Content-Type': 'application/json'});
    const empIdBody = {empId: empId};
    console.log("empId in bodySend", empId);
    console.log("empId in headersSend", headersSend);
    return this.http.post("http://10.10.5.55:8080/empedu/edudata", empIdBody, {headers: headersSend}).map(
      (res: Response) => {
        console.log("res.json from /empedu/edudata By id", res.json());
        return res.json();
      }
    );
  }

  /*
   to insert the Education Details By Employee Id
   */
  insertEmpEduDtlsByEmpId(educationData) {
    console.log("into insertEmpEduDtlsByEmpId method");
    const headersSend = new Headers({'Content-Type': 'application/json'});
    const bodySend = JSON.stringify(educationData);
    console.log("empId in bodySend", bodySend);
    console.log("empId in headersSend", headersSend);
    return this.http.post("http://10.10.5.55:8080/empedu/saveedudtls", bodySend, {headers: headersSend}).map(
      (res: Response) => {
        console.log("res.json from /empedu/saveedudtls By id", res.json());
        return res.json();
      }
    );
  }


  /*
   to pull the Contact Details by Employeee Id
   */
  getContDtls(empId) {
    console.log("into getContDtls method");
    const headersSend = new Headers({'Content-Type': 'application/json'});
    const empIdBody = {empId: empId};
    console.log("empId in bodySend", empId);
    console.log("empId in headersSend", headersSend);
    return this.http.post("http://10.10.5.55:8080/empcontacts/contdata", empIdBody, {headers: headersSend}).map(
      (res: Response) => {
        console.log("res.json from /empedu/edudata By id", res.json());
        return res.json();
      }
    );
  }

  /*
   to insert the employee contact details by employee id
   */
  insertEmpContDtlsByEmpId(contactDtls) {
    console.log("into insertEmpContDtlsByEmpId method");
    const headersSend = new Headers({'Content-Type': 'application/json'});
    const bodySend = JSON.stringify(contactDtls);
    console.log("empId in bodySend", bodySend);
    console.log("empId in headersSend", headersSend);
    return this.http.post("http://10.10.5.55:8080/empcontacts/savecontact", bodySend, {headers: headersSend}).map(
      (res: Response) => {
        console.log("res.json from /empcontacts/savecontact By id", res.json());
        return res.json();
      }
    );
  }


  /*
   to pull the Employee Benefits By empId
   */
  getBenefitDtls(empId) {
    console.log("into getContDtls method");
    const headersSend = new Headers({'Content-Type': 'application/json'});
    const empIdBody = {empId: empId};
    console.log("empId in bodySend", empId);
    console.log("empId in headersSend", headersSend);
    return this.http.post("http://10.10.5.55:8080/empbenefits/byempid", empIdBody, {headers: headersSend}).map(
      (res: Response) => {
        console.log("res.json from /empbenefits/byempid By id", res.json());
        return res.json();
      }
    );
  }

  /*
   to pull the Project Details by Employeee Id
   */
  getEmpProjDtlsByEmpId(empId){
    console.log("into getEmpProjDtlsByEmpId method");
    const headersSend = new Headers({'Content-Type':'application/json'});
    const empIdBody = {empId : empId };
    console.log("empId in bodySend",empId);
    console.log("empId in headersSend",headersSend);
    return this.http.post("http://10.10.5.55:8080/empvencli/byempid",empIdBody,{headers: headersSend}).map(
      (res:Response)=> {
        console.log("res.json from empvencli/byempid By id",res.json());
        return res.json();
      }
    );
  }


}
