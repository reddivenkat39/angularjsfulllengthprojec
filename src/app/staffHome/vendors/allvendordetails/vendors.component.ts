import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Vendor} from "./Vendor.interface";
import {VendorsService} from "../vendors.service";
import {EmployeeInvoice} from "../EmployeeInvoice.interface";
import {VendorInvoice} from "../VendorInvoice.interface";
import {InActiveVendorEmployee} from "../InActiveVendorEmployee.interface";
import {ToastsManager} from "ng2-toastr";
import {VendorEmployee} from "../VendorEmployee.interface";
import {forEach} from "@angular/router/src/utils/collection";
import {Employee} from "../../employees/Employee";
declare var $: any;

@Component({
  selector     : 'app-vendors',
  templateUrl  : './vendors.component.html',
  styleUrls    : ['./vendors.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VendorsComponent implements OnInit {
  private allVendor = false;

  private eachActiveVendorEmployees = false; // to show active vendor employees in html
  private eachInActiveVendorEmployees = false; // to show inactive vendor employees in html

  private isEachAllVendorInvoice = false;
  private isEachOpenVendorInvoice = false;
  private isEachCloseVendorInvoice = false;
  private allVendorInvoice = false;
  private tabsForEmployeeInvoice=false;
  private isEachAllEmployeeInvoice = false;
  private isEachOpenEmployeeInvoice = false;
  private isEachCloseEmployeeInvoice = false;
  private isEachVendorContactInfo =false;
  empId: '';
  private viewVendorContactDetails= { };
  private vendorEmployeeDetails ={
    'empName':''
  };

  allVendors: Vendor[]=[];   // to show all vendors table
  vendorActiveEmployees: VendorEmployee[]; // to show active employees by vendor id
  vendorInActiveEmployees: VendorEmployee[];// to show inactive employees by vendor id

  allEmployeeInvoices: EmployeeInvoice[]; // employee invoices used to insert the invoices by empId
  openEmployeeInvoices: EmployeeInvoice[]; // employee invoices used to insert the invoices by empId
  closeEmployeeInvoices: EmployeeInvoice[]; // employee invoices used to insert the invoices by empId
  allVendorInvoices: VendorInvoice[]; // all vendor invoices by vendor id
  openVendorInvoices: VendorInvoice[]; // open vendor invoices by vendor id
  closeVendorInvoices: VendorInvoice[]; // close vendor invoices by vendor id



  openInvsAmnt: number = 0;
  closedInvsAmnt: number = 0;
  allInvsAmnt: number = 0;
  openEmpInvsAmnt:number=0;
  closedEmpInvsAmnt:number=0;
  allEmpInvsAmnt:number=0;
  selectedVendor: Vendor;
  selectedVendorEmployee:Vendor;
  constructor(private vendorService: VendorsService, private toastMsg: ToastsManager) {
  }

  ngOnInit() {
    this.onClickEachActiveVendorEmployee();
    {
      this.vendorService.getAllVendorDetails().subscribe(
        res => {
          console.log("Into get all vendor details method response");
          if (res.datares != null) {
            console.log("yes getting all vendor data ", res.datares);

            this.allVendors = res.datares;
            this.defaultFirstRowSelect();
            console.log("term date ...", res.datares);

          } else if (res.successres != null) {
            console.log("success ", res.successres);
          } else if (res.errorres != null) {
            console.log("OOPs no data  found", res.errorres);
          } else {
            console.log("server problem ");
          }
        }
      );

    }
    /*this.allVendor = true;*/
    $("ol li").click(function () {
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
    });
    /*this.eachActiveVendorEmployees = true;
     this.eachInActiveVendorEmployees = false;*/
    // this.vendorService.getVendorActiveEmployeesByVendId().then(activeVendorEmployees => this.activeVendorEmployees = activeVendorEmployees);


    $("ul li").click(function () {
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
    });

  }

  defaultFirstRowSelect() {
    //default first row selection
    this.selectedVendor = this.allVendors[0];
    console.log("defaultFirstRowSelect :selectedVendor", this.selectedVendor);
    console.log("defaultFirstRowSelect :allVendors", this.allVendors);
    this.onRowSelectVendor(this.selectedVendor.venId);
  }

  onRowSelectVendor(venId) {
   /* console.log(event.data.venId);
    console.log("vendors tab clicked");
    let vendorId = event.data.venId;*/
    this.onClickVendorEmployee();
    let vendorId = venId;
    //reset count to zero
    console.log("Vendor.Component : onRowSelectVendor : venId :", venId);
    this.allInvsAmnt=0;
    this.closedInvsAmnt=0;
    this.openInvsAmnt=0;
    this.allEmpInvsAmnt=0;
    this.closedEmpInvsAmnt=0;
    this.openEmpInvsAmnt=0;

    /*
     to insert the employee details by vendor id from backend by filtering active employees
     */
    {
      this.vendorService.getVendorEmployeesByVendId(vendorId).subscribe(
        res => {
          if (res.datares != null) {
            console.log(res.datares);
            this.vendorActiveEmployees = res.datares.filter(row => {
              if (row.endDate == null)
                return row;
            });

            // this.vendorEmployeeDetails = res.datares;

            this.vendorInActiveEmployees = res.datares.filter(row => {
              if (row.endDate != null)
                return row;
            });
          } else if (res.errorres != null) {
            console.log(res.errorres);
            console.log(res.datares);

            this.vendorActiveEmployees = null;
            this.vendorInActiveEmployees = null;
          } else if (res.successres != null) {
            console.log(res.successres);
          } else {
            this.toastMsg.error('Please Login Again', 'Server Problem');
          }
        }
      );
    }



    /*
     to get the invoices by vendor id from backend
     */
    {
      this.vendorService.getAllInvoicesByVendorId(vendorId).subscribe(
        res => {
          if (res.datares != null) {
            console.log("datares of vendor invoices : ", res.datares);
            /*
             to seperate OPEN invoices and to show sum of all OPEN invoices total amount
             */
            this.openVendorInvoices = res.datares.filter(row => {
              if (row.invStatus == "OPEN") {
                this.openInvsAmnt += row.invAmt;
                return row;
              }
            });

            /*
             to seperate closed invoices and to show sum of all closed invoices total amount
             */
            this.closeVendorInvoices = res.datares.filter(row => {
              if (row.invStatus == "CLOSED") {
                this.closedInvsAmnt += row.invAmt;
                return row;
              }
              });

            this.allVendorInvoices = res.datares;
            for (let i = 0; i < this.allVendorInvoices.length; i++) {
              this.allInvsAmnt += this.allVendorInvoices[i].invAmt;
            }

            }else if(res.errorres!=null){
              console.log(res.errorres);
              this.openVendorInvoices = null;
              this.closeVendorInvoices = null;
              this.allVendorInvoices = null;
            }else if(res.successres!=null){
              console.log(res.successres);
            }else {
              this.toastMsg.error('Please Login Again', 'Server Problem');
            }
          }
        );
      }
    /*
     to get the contact info of vendor by vendor id from backend
     */
    {
      this.vendorService.getAllContactsByVendorId(vendorId).subscribe(
        res=> {
          if(res.datares!=null){
            console.log("datares of vendor contacts : ",res.datares);
            this.viewVendorContactDetails=res.datares[0];
          }else if(res.errorres!=null){
            console.log(res.errorres);
            this.viewVendorContactDetails=null;
          }else if(res.successres!=null){
            console.log(res.successres);
          }else {
            this.toastMsg.error('Please Login Again', 'Server Problem');
          }
        }
      );
    }
  }
  onClickVendorEmployee() {
    console.log("vendor employees clicked");
    this.allVendor = true;
    this.isEachVendorContactInfo=false;
    this.eachActiveVendorEmployees = true;
    this.eachInActiveVendorEmployees = false;
    this.allVendorInvoice = false;
    this.tabsForEmployeeInvoice=false;
    this.isEachOpenEmployeeInvoice=false;
    this.isEachAllVendorInvoice = false;
    this.isEachOpenVendorInvoice = false;
    this.isEachCloseVendorInvoice = false;

  }

  onClickEachActiveVendorEmployee() {
    console.log("Active vendor employees");
    this.allVendor = true;
    this.eachActiveVendorEmployees = true;
    this.eachInActiveVendorEmployees = false;
    this.allVendorInvoice = false;
    this.tabsForEmployeeInvoice=false;
    this.isEachOpenVendorInvoice=false;
    this.isEachAllEmployeeInvoice = false;
    this.isEachOpenEmployeeInvoice = false;
    this.isEachCloseEmployeeInvoice = false;
    this.isEachVendorContactInfo=false;
  }


  onClickEachInActiveVendorEmployee() {
    console.log("In Active vendor employees");
    this.allVendor = true;
    this.eachActiveVendorEmployees = false;
    this.eachInActiveVendorEmployees = true;
    this.allVendorInvoice = false;
    this.tabsForEmployeeInvoice=false;
    this.isEachOpenVendorInvoice=false;
    this.isEachAllEmployeeInvoice = false;
    this.isEachOpenEmployeeInvoice = false;
    this.isEachCloseEmployeeInvoice = false;
    this.isEachVendorContactInfo=false;
  }

  onClickVendorInvoice() {
    this.allVendorInvoice = true;
    this.isEachAllVendorInvoice = false;
    this.isEachOpenVendorInvoice = true;
    this.isEachCloseVendorInvoice = false;
    this.isEachOpenEmployeeInvoice=false;
    this.tabsForEmployeeInvoice=false;
    this.allVendor = false;
    this.isEachVendorContactInfo=false;
  }

  onVendorSelectEmployeeInvoices(event, employee: VendorEmployee) {
   console.log("vendor each employee invoice");
   console.log( "event and vendor employee data is..... ",employee.empId);
   // debugger;
    this.onClickButtonEmployeeInvoice();
    console.log("employee Name is ", employee.empName);
    this.vendorEmployeeDetails.empName = employee.empName;
    console.log(" employee name in: vendorEmployeeDetails tab : ", this.vendorEmployeeDetails);
     this.vendorService.getEmployeeInvoicesById( employee.empId).subscribe(
     res=> {
       if(res.datares != null){

         console.log('employee name after service call done :::: ', this.vendorEmployeeDetails);
         console.log("datares of employee invoices : ",res.datares);
         this.openEmployeeInvoices=res.datares.filter(row => {
           if (row.invStatus == "OPEN") {
             this.openEmpInvsAmnt += row.invAmt;
             return row;
           }
         });
         this.closeEmployeeInvoices=res.datares.filter(row => {
           if (row.invStatus == "CLOSED")
           {
             this.closedEmpInvsAmnt += row.invAmt;
             return row;
           }
         });
         this.allEmployeeInvoices=res.datares;
         for (let i = 0; i < this.allEmployeeInvoices.length; i++) {
           this.allEmpInvsAmnt += this.allEmployeeInvoices[i].invAmt;
         }

       }else if(res.errorres!=null){
         console.log(res.errorres);
        this.openEmployeeInvoices = null;
         this.allEmployeeInvoices = null;
         this.closeEmployeeInvoices = null;
       }else if(res.successres!=null){
         console.log(res.successres);
       }else {
         this.toastMsg.error('Please Login Again', 'Server Problem');
       }
     });
   }

  onClickAllInvoice() {
    console.log("All Invoice clicked");
    this.isEachAllVendorInvoice = true;
    this.isEachOpenVendorInvoice = false;
    this.isEachCloseVendorInvoice = false;
  }

  onClickOpenInvoice() {
   console.log("Open Invoice clicked");
    this.isEachAllVendorInvoice = false;
    this.isEachOpenVendorInvoice = true;
    this.isEachCloseVendorInvoice = false;
  }


  onClickCloseInvoice() {
    console.log("Close Invoice clicked");
    this.isEachAllVendorInvoice = false;
    this.isEachOpenVendorInvoice = false;
    this.isEachCloseVendorInvoice = true;
  }


  onClickButtonEmployeeInvoice(){
    this.isEachVendorContactInfo=false;
    this.eachActiveVendorEmployees = false;
    this.eachInActiveVendorEmployees = false;
    this.isEachAllVendorInvoice = false;
    this.isEachOpenVendorInvoice = false;
    this.isEachCloseVendorInvoice = false;
    this.allVendorInvoice = false;
    this.tabsForEmployeeInvoice=true;
    this.allVendor = false;
    this.isEachAllEmployeeInvoice = false;
    this.isEachOpenEmployeeInvoice = true;
    this.isEachCloseEmployeeInvoice = false;
  }
  onClickCloseEmployeeInvoice(){
    this.isEachAllEmployeeInvoice = false;
    this.isEachOpenEmployeeInvoice = false;
    this.isEachCloseEmployeeInvoice = true;
  }
  onClickAllEmployeeInvoice(){
    this.isEachAllEmployeeInvoice = true;
    this.isEachOpenEmployeeInvoice = false;
    this.isEachCloseEmployeeInvoice = false;
  }
  onClickOpenEmployeeInvoice(){
    this.isEachAllEmployeeInvoice = false;
    this.isEachOpenEmployeeInvoice = true;
    this.isEachCloseEmployeeInvoice = false;
  }

  onClickVendorContactInfo(){
    this.isEachVendorContactInfo=true;
    this.allVendor=false;
    this.allVendorInvoice=false;
    this.tabsForEmployeeInvoice=false;
  }

}
