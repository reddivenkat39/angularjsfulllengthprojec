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
  private isTabnerInvoicesTable=false;
  private isOpenInvoices = false;
  private isClosedInvoices = false;
  private ispastDueInvoices = false;


  allTabnerInvoices:Invoice[];
  openInvoices: Invoice[];
  closedInvoices: Invoice[];
  pastDueInvoices : Invoice[];



  constructor(private invoiceService:InvoiceService) { }

  ngOnInit() {
    this.isTabnerInvoicesTable=true;
    $("ul li").click(function () {
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
    });
    this.onClickOpenInvoice();
  }

  onClickAllInvoice(){
    this.isTabnerInvoicesTable=true;
    this.isOpenInvoices = false;
    this.isClosedInvoices = false;
    this.ispastDueInvoices = false;
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


  onClickOpenInvoice(){
    this.isTabnerInvoicesTable=false;
    this.isOpenInvoices = true;
    this.isClosedInvoices = false;
    this.ispastDueInvoices = false;
    this.invoiceService.getAllInvoices().subscribe(
      res=>{
        if(res.datares!=null){
          this.openInvoices = res.datares.filter(row => {
            if (row.invStatus == "OPEN")
              return row;
          });
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


  onClickCloseInvoice(){
    this.isTabnerInvoicesTable=false;
    this.isOpenInvoices = false;
    this.isClosedInvoices = true;
    this.ispastDueInvoices = false;
    this.invoiceService.getAllInvoices().subscribe(
      res=>{
        if(res.datares!=null){
          this.closedInvoices = res.datares.filter(row => {
            if (row.invStatus != 'OPEN')
              return row;
          });
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

  onClickPastDueInvoice(){
    this.isTabnerInvoicesTable=false;
    this.isOpenInvoices = false;
    this.isClosedInvoices = false;
    this.ispastDueInvoices = true;

    this.invoiceService.getAllInvoices().subscribe(
      res=>{
        if(res.datares!=null){
          this.openInvoices = res.datares.filter(row => {
            if (row.invStatus == 'OPEN' )
              return row;
          });
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
