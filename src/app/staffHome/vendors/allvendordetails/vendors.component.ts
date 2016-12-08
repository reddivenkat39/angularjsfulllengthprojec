import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Vendor} from "./Vendor.interface";
import {VendorsService} from "../vendors.service";
import {EmployeeInvoice} from "../EmployeeInvoice.interface";
import {VendorInvoice} from "../VendorInvoice.interface";
import {ActiveVendorEmployee} from "../ActiveVendorEmployee.interface";
import {InActiveVendorEmployee} from "../InActiveVendorEmployee.interface";
import {ToastsManager} from "ng2-toastr";
declare var $: any;

@Component({
  selector     : 'app-vendors',
  templateUrl  : './vendors.component.html',
  styleUrls    : ['./vendors.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VendorsComponent implements OnInit {
  private allVendor = false;
  private eachActiveVendorEmployees = false;
  private eachInActiveVendorEmployees = false;
  private eachVendorInvoice = false;
  private allVendorInvoice = false;
  private eachEmployeeInvoice = false;
  private allInvoice = false;
  private openInvoice = false;
  private closeInvoice = false;
  allVendors: Vendor[];
  activeVendorEmployees: ActiveVendorEmployee[];
  inActiveVendorEmployees: InActiveVendorEmployee[];
  employeeInvoices: EmployeeInvoice[];
  vendorInvoices: VendorInvoice[];
  selectedVendor: Vendor;

  constructor(private vendorService: VendorsService, private toastMsg: ToastsManager) {
  }

  ngOnInit() {
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
    this.allVendor = true;
    $("ol li").click(function () {
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
    });
    this.eachActiveVendorEmployees = true;
    this.eachInActiveVendorEmployees = false;
    // this.vendorService.getVendorActiveEmployeesByVendId().then(activeVendorEmployees => this.activeVendorEmployees = activeVendorEmployees);


    $("ul li").click(function () {
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
    });
  }

  onClickView($event, vendor: Vendor) {
    //TODO : optimise the below line
    if ($(".fa-angle-double-down").length > 0) {
      $(".fa-angle-double-down")[0].className = "fa fa-angle-double-right";
    }
    $event.currentTarget.children[0].className = "fa fa-angle-double-down";

    console.log("vendors tab clicked")
    this.allVendor = true;
    this.eachActiveVendorEmployees = true;

    this.vendorService.getVendorEmployeesByVendId(vendor.venId).subscribe(
      res => {
        if (res.datares != null) {
        console.log(res.datares);
        this.activeVendorEmployees = res.datares;
        //   .filter(
        //   row=>{
        //     if(row.)
        //   }
        // );
        } else if (res.errorres != null) {
          console.log(res.errorres);
        } else if (res.successres != null) {
          console.log(res.successres);
        } else {
        this.toastMsg.error('Please Login Again','Server Problem');
        }
      }
    );
  }

  onClickVendorEmployee() {
    this.eachActiveVendorEmployees = true;
    this.eachInActiveVendorEmployees = false;
    this.allVendor = true;
    this.allVendorInvoice = false;
    this.eachVendorInvoice = false;
    this.eachEmployeeInvoice = false;
    // this.vendorService.getVendorActiveEmployees().then(activeVendorEmployees => this.activeVendorEmployees = activeVendorEmployees);
  }

  onClickEachActiveVendorEmployee() {
    console.log("Active vendor employees");
    this.allVendor = true;
    this.eachActiveVendorEmployees = true;
    this.eachInActiveVendorEmployees = false;
    // this.vendorService.getVendorActiveEmployees().then(activeVendorEmployees => this.activeVendorEmployees = activeVendorEmployees);
  }

  onClickEachInActiveVendorEmployee() {
    this.allVendor = true;
    this.eachInActiveVendorEmployees = true;
    this.eachActiveVendorEmployees = false;
    this.vendorService.getVendorInActiveEmployees().then(inActiveVendorEmployees => this.inActiveVendorEmployees = inActiveVendorEmployees);
    console.log("Inactive vendor employees");
  }

  onClickVendorInvoice() {
    this.allVendorInvoice = true;
    this.eachVendorInvoice = true;
    this.eachEmployeeInvoice = false;
    this.allVendor = false;
    this.openInvoice = true;
    this.allInvoice = false;
    this.closeInvoice = false;
    this.vendorService.getVendorInvoices().then(vendorInvoices => this.vendorInvoices = vendorInvoices);
  }

  onClickEachEmployeeInvoice() {
    this.eachActiveVendorEmployees = false;
    this.eachInActiveVendorEmployees = false;
    this.eachEmployeeInvoice = true;
    this.eachVendorInvoice = false;
    this.allVendorInvoice = true;
    this.allVendor = false;
    this.vendorService.getEmployeeInvoices().then(employeeInvoices => this.employeeInvoices = employeeInvoices);
  }

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
