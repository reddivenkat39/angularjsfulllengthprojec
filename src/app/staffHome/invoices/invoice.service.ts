import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Invoice} from "./Invoice.interface";

@Injectable()
export class InvoiceService {

  constructor(private http:Http) { }
  getInvoices(){
    return this.http.get('/app/staffHome/invoices/invoice.json')
      .toPromise()
      .then(res =>< Invoice[] > res.json().data)
      .then(data => { return data; });
  }
}
