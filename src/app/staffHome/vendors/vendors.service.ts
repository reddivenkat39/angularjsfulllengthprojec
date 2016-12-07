import { Injectable } from '@angular/core';
import {Headers, Response} from "@angular/http";
import {HttpService} from "../../globalservices/http.service";
import {ActiveVendorEmployee} from "./ActiveVendorEmployee.interface";
import {InActiveVendorEmployee} from "./InActiveVendorEmployee.interface";
import {EmployeeInvoice} from "./EmployeeInvoice.interface";
import {VendorInvoice} from "./VendorInvoice.interface";

@Injectable()
export class VendorsService {

  constructor(private http: HttpService) { }
  getAllVendorDetails(){
    console.log("Into get all vendor details method");
    const headersSend = new Headers({'Content-Type':'application/json'});
    return this.http.get("/tep/allvendordetails",{headers: headersSend}).map(
      (res:Response)=> {
        console.log("getting all Vendor details ",res.json());
        return res.json();
      }
    );
  }
  getVendorActiveEmployees() {
    return this.http.get('/app/staffHome/vendors/activeVendorEmployees.json')
      .toPromise()
      .then(res =>< ActiveVendorEmployee[] > res.json().data)
      .then(data => { return data; });
  }
  getVendorInActiveEmployees(){
    return this.http.get('/app/staffHome/vendors/inActiveVendorEmployees.json')
      .toPromise()
      .then(res =>< InActiveVendorEmployee[] > res.json().data)
      .then(data => { return data; });
  }
  getEmployeeInvoices(){
    return this.http.get('/app/staffHome/vendors/employeeInvoices.json')
      .toPromise()
      .then(res =>< EmployeeInvoice[] > res.json().data)
      .then(data => { return data; });
  }
  getVendorInvoices(){
    return this.http.get('/app/staffHome/vendors/vendorInvoices.json')
      .toPromise()
      .then(res =>< VendorInvoice[] > res.json().data)
      .then(data => { return data; });
  }
}
