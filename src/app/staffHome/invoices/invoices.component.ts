import { Component, OnInit } from '@angular/core';
import {InvoiceService} from "./invoice.service";
import {Invoice} from "./Invoice.interface";
declare var $:any;

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  private allTabnerInvoicesTable=false;
  allTabnerInvoices:Invoice[];
  constructor(private invoiceService:InvoiceService) { }

  ngOnInit() {
    this.allTabnerInvoicesTable=true;
    $("ul li").click(function () {
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
    });
    this.invoiceService.getAllInvoices().subscribe(
      res=>{
        if(res.datares!=null){
          this.allTabnerInvoices = res.datares;
        }
        else if(res.datares!=null){
          console.log('server problem');
        }else if(res.errorres!=null){
          console.log('server problem');
        }else if(res.successres!=null){
          console.log('server problem');
        }else {
          console.log('server problem');
        }
      }
    );
  }

}
