import { Injectable } from '@angular/core';
import { Headers, Response} from "@angular/http";
import {HttpService} from "../../globalservices/http.service";

@Injectable()
export class AddstaffService {

  constructor(private http: HttpService) {
  }

  sendAddStaffDetails(myAddStaffForm) {
    console.log("send Add Staff details: Add New Staff ", myAddStaffForm);
    const bodySend = JSON.stringify(myAddStaffForm);
    console.log("myForm body ...........", bodySend);
    const headersSend = new Headers({'Content-Type': 'application/json'});
    return this.http.post("http://10.10.5.55:8080/staffregistration", bodySend, {headers: headersSend}).map((res: Response)=> {
    return this.http.post("http://localhost:8080/staffregistration", bodySend, {headers: headersSend}).map((res: Response)=> {
        console.log("send Add Staff details", res);
        console.log("only key value pairs", res);
        return res.json()
      }
    );
  }


}
