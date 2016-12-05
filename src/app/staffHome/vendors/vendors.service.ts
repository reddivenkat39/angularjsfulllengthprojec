import { Injectable } from '@angular/core';
import {Http,Headers, Response} from "@angular/http";
import {EmployeeInvoice} from "./EmployeeInvoice.interface";
import {VendorInvoice} from "./VendorInvoice.interface";
import {ActiveVendorEmployee} from "./ActiveVendorEmployee.interface";
import {InActiveVendorEmployee} from "./InActiveVendorEmployee.interface";

@Injectable()
export class VendorsService {

  constructor(private http: Http) { }
  getAllVendorDetails(){
    console.log("Into get all vendor details method");
    const headersSend = new Headers({'Content-Type':'application/json'});
    return this.http.get("http://10.10.5.55:8080/allvendordetails",{headers: headersSend}).map(
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
