import { Injectable } from '@angular/core';
import {Http,Headers, Response} from "@angular/http";

@Injectable()
export class VendorsService {

  constructor(private http: Http) { }
  getAllVendorDetails(){
    /*console.log("Into get all vendor details method");
    const headersSend = new Headers({'Content-Type':'application/json'});
    return this.http.get("http://10.10.5.55:8080/getvendordetailinfo",{headers: headersSend}).map(
      (res:Response)=> {
        console.log("getting all Vendor details ",res.json());
        return res.json();
      }
    );*/
  }
}
