import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Vendor} from "./Vendor.interface";
import {VendorsService} from "../vendors.service";
import {EmployeeInvoice} from "../EmployeeInvoice.interface";
import {VendorInvoice} from "../VendorInvoice.interface";
import {InActiveVendorEmployee} from "../InActiveVendorEmployee.interface";
import {ToastsManager} from "ng2-toastr";
import {VendorEmployee} from "../VendorEmployee.interface";
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

  private eachVendorInvoice = false;
  private allVendorInvoice = false;
  private eachEmployeeInvoice = false;

  private allInvoice = false;
  private openInvoice = false;
  private closeInvoice = false;


  allVendors: Vendor[];   // to show all vendors table
  vendorActiveEmployees: VendorEmployee[]; // to show active employees by vendor id
  vendorInActiveEmployees: VendorEmployee[];// to show inactive employees by vendor id


  employeeInvoices: EmployeeInvoice[]; // employee invoices used to insert the invoices by empId
  vendorInvoices: VendorInvoice[]; // all vendor invoices by vendor id

  selectedVendor: Vendor;

  constructor(private vendorService: VendorsService, private toastMsg: ToastsManager) {
  }

  ngOnInit() {
    this.onClickEachActiveVendorEmployee();
    this.vendorService.getAllVendorDetails().subscribe(
      res => {
        console.log("Into get all vendor details method response");
        if (res.datares != null) {
          console.log("yes getting all vendor data ", res.datares);

          this.allVendors = res.datares;
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

  onRowSelectVendor(event) {
    console.log(event.data.venId);
    console.log("vendors tab clicked");
    this.allVendor = true;
     let vendorId = event.data.venId;

    /*
     to insert the employee details by vendor id from backend by filtering active employees
     */
    {
      this.vendorService.getVendorEmployeesByVendId(vendorId).subscribe(
        res => {
          if (res.datares != null) {
            console.log(res.datares);
            this.vendorActiveEmployees = res.datares.filter(row => {
              if (row.invEndDt == null)
                return row;
            });
            // this.vendorInActiveEmployees = res.datares.filter(row => {
            //   if (row.invEndDt != null)
            //     return row;
            // });
          } else if (res.errorres != null) {
            console.log(res.errorres);
            console.log(res.datares);
            this.vendorActiveEmployees = null;
          } else if (res.successres != null) {
            console.log(res.successres);
          } else {
            this.toastMsg.error('Please Login Again', 'Server Problem');
          }
        }
      );
    }

    /*
     to insert the employee details by vendor id from backend by filtering inactive employees
     */

    {
      this.vendorService.getVendorEmployeesByVendId(vendorId).subscribe(
        res => {
          if (res.datares != null) {
            console.log(res.datares);
            // this.vendorActiveEmployees = res.datares.filter(row => {
            //   if (row.invEndDt == null)
            //     return row;
            // });
            this.vendorInActiveEmployees = res.datares.filter(row => {
              if (row.invEndDt != null)
                return row;
            });
          } else if (res.errorres != null) {
            console.log(res.errorres);
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
        res=> {
          if(res.datares!=null){
            console.log("datares is : ",res.datares);
          }else if(res.errorres!=null){

          }else if(res.successres!=null){

          }else {
            console.log("server problem");
          }
        }
      );
    }


  }




  onClickVendorEmployee() {
    console.log("vendor employees clicked");
    this.allVendor = true;
    this.eachActiveVendorEmployees = true;
    this.eachInActiveVendorEmployees = false;
    this.allVendorInvoice = false;
    this.eachVendorInvoice = false;
    this.eachEmployeeInvoice = false;

  }

  onClickEachActiveVendorEmployee() {
    console.log("Active vendor employees");
    this.allVendor = true;
    this.eachActiveVendorEmployees = true;
    this.eachInActiveVendorEmployees = false;
    this.allVendorInvoice = false;
    this.eachVendorInvoice = false;
    this.eachEmployeeInvoice = false;
  }


  onClickEachInActiveVendorEmployee() {
    console.log("In Active vendor employees");
    this.allVendor = true;
    this.eachActiveVendorEmployees = false;
    this.eachInActiveVendorEmployees = true;
    this.allVendorInvoice = false;
    this.eachVendorInvoice = false;
    this.eachEmployeeInvoice = false;
  }

  // onClickVendorInvoice() {
  //   this.allVendorInvoice = true;
  //   this.eachVendorInvoice = true;
  //   this.eachEmployeeInvoice = false;
  //   this.allVendor = false;
  //   this.openInvoice = true;
  //   this.allInvoice = false;
  //   this.closeInvoice = false;
  //   this.vendorService.getVendorInvoices().then(vendorInvoices => this.vendorInvoices = vendorInvoices);
  // }

  /* onClickEachEmployeeInvoice() {
   this.eachActiveVendorEmployees = false;
   this.eachInActiveVendorEmployees = false;
   this.eachEmployeeInvoice = true;
   this.eachVendorInvoice = false;
   this.allVendorInvoice = true;
   this.allVendor = false;
   this.vendorService.getEmployeeInvoices().then(employeeInvoices => this.employeeInvoices = employeeInvoices);
   }*/

  onClickAllVendor() {
    this.allInvoice = true;
    this.openInvoice = false;
    this.closeInvoice = false;
  }

  onClickOpenInvoice() {
    this.openInvoice = true;
    this.allInvoice = false;
    this.closeInvoice = false;
  }

  onClickCloseInvoice() {
    this.closeInvoice = true;
    this.allInvoice = false;
    this.openInvoice = false;
  }
}
