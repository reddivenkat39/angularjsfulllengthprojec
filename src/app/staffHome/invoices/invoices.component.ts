import {Component, OnInit} from '@angular/core';
import {InvoiceService} from "./invoice.service";
import {Invoice} from "./Invoice.interface";
import {ToastsManager} from "ng2-toastr";
declare var $:any;

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  openInvsAmnt: number = 0;
  closedInvsAmnt: number = 0;
  allInvsAmnt: number = 0;
  pstDueInvsAmnt:number=0;


  filteredInvoices : Invoice[] =[];
  allInvoices:Invoice[]=[];
  openInvoices: Invoice[]=[];
  closedInvoices: Invoice[]=[];
  pastDueInvoices : Invoice[]=[];
  orderedInvoices : Invoice[] = [];
  tableHeader : string = "";//table Header value based on the selection
  tableInvAmt:number=0;//table inv amt based on selection
  exportFileName :string=""; //export file name based on selection
  constructor(private invoiceService:InvoiceService,private toastManager: ToastsManager) { }

  ngOnInit() {
    this.loadInvoices("Open");
    $("ul li").click(function () {
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
    });

  }
  loadInvoices(filter : string) {
    console.log("invoices.components : loadInvoices for: ", filter);
    this.allInvsAmnt=0;
    this.closedInvsAmnt=0;
    this.openInvsAmnt=0;
    this.pstDueInvsAmnt=0;
    // this.overStatus = '';
    this.invoiceService.getAllInvoices().subscribe(
      res => {
        console.log("invoices.components : loadInvoices: getAllInvoices: response : ", res);
        if (res.datares != null && res.errorres == null) {
          this.allInvoices = res.datares;

          this.openInvoices =[];
          this.closedInvoices =[];
          this.pastDueInvoices=[];
          res.datares.filter(row => {
            if (row.invStatus == "OPEN") {//fill open invoices
              this.openInvsAmnt += row.invAmt;
              this.openInvoices.push(row);

              this.getPastDueDateInvoices(row);

            }else if(row.invStatus == "CLOSED") {//fill close invoices
              this.closedInvsAmnt += row.invAmt;
              this.closedInvoices.push(row);
            }
            //To get All rows invoices amount
            this.allInvsAmnt += row.invAmt;
          });

          console.log("invoices.components : loadInvoices: getAllInvoices: All invoices : ", this.allInvoices);
          console.log("invoices.components : loadInvoices: getAllInvoices: All open invoices : ", this.openInvoices);
          console.log("invoices.components : loadInvoices: getAllInvoices: All close invoices : ", this.closedInvoices);
          console.log("invoices.components : loadInvoices: getAllInvoices: All pastdue invoices : ", this.pastDueInvoices);
        }
        else {
          console.log("invoices.components : loadInvoices: getAllInvoices:  Error in response : ", res.errorres);
          this.toastManager.error(res.errorres, 'Data Fetching Failed');
        }
        this.loadFilteredData(filter);
      }
    );
  }

  getPastDueDateInvoices(row){
    let currentDt = new Date((new Date()).setHours(0, 0, 0, 0));//to get only date
    let rowDueDt = new Date(row.dueDt);
    //Compare invoice due date with current date
    if(rowDueDt < currentDt ){
      console.log(rowDueDt < currentDt);
      let oneDay = 24*60*60*1000;
      // let daysDiff =  Math.round((currentDt - rowDueDt)/oneDay);
      let daysDiff= Math.round(Math.abs(rowDueDt.getTime() - new Date().getTime())/(oneDay))-1;
      //ToDo:adding this logic to fix sorting issue. Please look for better option here
      //(daysDiff > 9 ? "0":"") //to add preceeding zero for single digit numbers

      let overStatus ="OVER DUE by "+ (daysDiff < 10 ? "0":"") + daysDiff +" days"; //show past due status with day count
      row.invStatus = overStatus; //for past due amounts change of status

      this.pstDueInvsAmnt+=row.invAmt;
      this.pastDueInvoices.push(row);//fill past due invoices
    }
  }


  loadFilteredData(filter : string){
    switch(filter)
    {
      case "All" :
        this.filteredInvoices = this.allInvoices;
        this.tableHeader = "All Invoices";
        this.tableInvAmt=this.allInvsAmnt;
        this.exportFileName="All Invoices";
        console.log("Filtered invoices : All:", this.filteredInvoices);
        break;

      case "Open" :
        this.filteredInvoices = this.openInvoices;
        this.tableHeader = "Open Invoices";
        this.tableInvAmt=this.openInvsAmnt;
        this.exportFileName="Open Invoices";
        console.log("Filtered invoices: Open:", this.filteredInvoices);
        break;

      case "Close" :
        this.filteredInvoices = this.closedInvoices;
        this.tableHeader = "Close Invoices";
        this.tableInvAmt=this.closedInvsAmnt;
        this.exportFileName="Close Invoices";
        console.log("Filtered invoices : Close :", this.filteredInvoices);
        break;
      case "PastDue":
        this.filteredInvoices = this.pastDueInvoices;
        this.tableHeader = "PastDue Invoices";
        this.tableInvAmt=this.pstDueInvsAmnt;
        this.exportFileName="PastDue Invoices";
        console.log("Filtered invoices : Past Due:", this.filteredInvoices);
        break;
    }
  }
}
