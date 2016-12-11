import { Injectable } from '@angular/core';
import {Headers, Response} from "@angular/http";
import {HttpService} from "../../globalservices/http.service";

import {InActiveVendorEmployee} from "./InActiveVendorEmployee.interface";
import {EmployeeInvoice} from "./EmployeeInvoice.interface";
import {VendorInvoice} from "./VendorInvoice.interface";

@Injectable()
export class VendorsService {

  constructor(private http: HttpService) { }


  getAllVendorDetails(){
    console.log("Into get all vendor details method");
    const headersSend = new Headers({'Content-Type':'application/json'});
    return this.http.get("http://localhost:8080/allvendordetails",{headers: headersSend}).map(
      (res:Response)=> {
        console.log("getting all Vendor details ",res.json());
        return res.json();
      }
    );
  }

  getVendorEmployeesByVendId(vendorId) {
    const headersSend = new Headers({'Content-Type':'application/json'});
    const bodySend = {venId:vendorId};
    console.log(bodySend);
    return this.http.post("http://localhost:8080/allemployeesbyvendId",bodySend,{headers: headersSend}).map(
      (res:Response)=> {
        console.log("getting all employee details by vendor id"+" bodySend ",res.json());
        return res.json();
      }
    );
  }



  getAllInvoicesByVendorId(vendorID){
    const headersSend = new Headers({'Content-Type':'application/json'});
    const bodySend = {venId:vendorID};
    console.log(bodySend);
    return this.http.post("http://localhost:8080/allinvoicesbyvendid",bodySend,{headers: headersSend}).map(
      (res:Response)=> {
        console.log("getting all invoices details by vendor id"+" bodySend ",res.json());
        return res.json();
      }
    );

  }
  getVendorInvoices(){
    return this.http.get('/app/staffHome/vendors/vendorInvoices.json')
      .toPromise()
      .then(res =>< VendorInvoice[] > res.json().data)
      .then(data => { return data; });
  }
}
