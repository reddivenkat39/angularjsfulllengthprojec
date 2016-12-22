import { Injectable } from '@angular/core';
import {Headers, Response} from "@angular/http";
import {Project} from "./Project.interface";
import {HttpService} from "../../globalservices/http.service";

@Injectable()
export class ProjectService {

  constructor(private http: HttpService) { }
  getSowData() {
    const headersSend = new Headers({'Content-Type':'application/json'});
    return this.http.get("http://10.10.5.55:8080/sowclirel/allsow",{headers: headersSend}).map(
      (res:Response)=> {
        return res.json();
      }
    );
  }


  getProjectsData(){
    const headersSend = new Headers({'Content-Type':'application/json'});
    return this.http.get("http://10.10.5.55:8080/empvencli/allprojects",{headers: headersSend}).map(
      (res:Response)=> {
        return res.json();
      }
    );
  }
  getSowInvoices(SOWNUM){
    const headersSend = new Headers({'Content-Type':'application/json'});
    const bodySend = {sowNum: SOWNUM};
    return this.http.post("http://10.10.5.55:8080/empveninvinf/allinvoicesbysownum", bodySend, {headers: headersSend}).map(
      (res: Response) => {
        console.log("getting all contact details by vendor id" + " bodySend ", res.json());
        return res.json();
      }
    );
  }

}
