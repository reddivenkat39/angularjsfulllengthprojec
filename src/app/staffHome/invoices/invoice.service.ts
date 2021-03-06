import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Invoice} from "./Invoice.interface";
import {HttpService} from "../../globalservices/http.service";

@Injectable()
export class InvoiceService {

  constructor(private http: HttpService) {
  }

  getAllInvoices() {
    const headersSend = new Headers({'Content-Type': 'application/json'});

    return this.http.get("http://localhost:8080/empveninvinf/allinvoices", {headers: headersSend}).map(
      (res: Response) => {
        console.log("getting all invoices ", res.json());
        return res.json();
      }
    );
  }
}
