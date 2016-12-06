import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Vendor} from "./Vendor.interface";
import {VendorsService} from "../vendors.service";
import {EmployeeInvoice} from "../EmployeeInvoice.interface";
import {VendorInvoice} from "../VendorInvoice.interface";
import {ActiveVendorEmployee} from "../ActiveVendorEmployee.interface";
import {InActiveVendorEmployee} from "../InActiveVendorEmployee.interface";
declare var $:any;

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VendorsComponent implements OnInit {
  private allVendor = false;
  private eachActiveVendorEmployees=false;
  private eachInActiveVendorEmployees=false;
  private eachVendorInvoice=false;
  private eachEmployeeInvoice=false;
  allVendors: Vendor[];
  activeVendorEmployees:ActiveVendorEmployee[];
  inActiveVendorEmployees :InActiveVendorEmployee[];
  employeeInvoices: EmployeeInvoice[];
  vendorInvoices:VendorInvoice[];
  selectedVendor:Vendor;
  constructor(private vendorService:VendorsService) { }

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
    this.allVendor=true;
    $("ol li").click(function() {
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
    });
    this.eachActiveVendorEmployees=true;
    this.eachInActiveVendorEmployees=false;
    this.vendorService.getVendorActiveEmployees().then(activeVendorEmployees => this.activeVendorEmployees = activeVendorEmployees);


    $("ul li").click(function() {
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
    });
  }

  onClickView(onEachVendorDetail){
    this.allVendor=true;
    this.eachActiveVendorEmployees=true;
    this.vendorService.getVendorActiveEmployees().then(activeVendorEmployees => this.activeVendorEmployees = activeVendorEmployees);
  }

  onClickVendorEmployee(){
    this.eachActiveVendorEmployees=true;
    this.eachInActiveVendorEmployees=false;
    this.allVendor=true;
    this.eachVendorInvoice=false;
    this.eachEmployeeInvoice=false;
    this.vendorService.getVendorActiveEmployees().then(activeVendorEmployees => this.activeVendorEmployees = activeVendorEmployees);
  }
  onClickEachActiveVendorEmployee(){
    console.log("Active vendor employees");
    this.allVendor=true;
    this.eachActiveVendorEmployees=true;
    this.eachInActiveVendorEmployees=false;
    this.vendorService.getVendorActiveEmployees().then(activeVendorEmployees => this.activeVendorEmployees = activeVendorEmployees);
  }
  onClickEachInActiveVendorEmployee(){
    this.allVendor=true;
    this.eachInActiveVendorEmployees=true;
    this.eachActiveVendorEmployees=false;
    this.vendorService.getVendorInActiveEmployees().then(inActiveVendorEmployees => this.inActiveVendorEmployees = inActiveVendorEmployees);
    console.log("Inactive vendor employees");
  }
  onClickVendorInvoice(){
    this.eachVendorInvoice=true;
    this.eachEmployeeInvoice=false;
    this.allVendor=false;
    this.vendorService.getVendorInvoices().then(vendorInvoices => this.vendorInvoices = vendorInvoices);

  }
  onClickEachEmployeeInvoice(){
    this.eachActiveVendorEmployees=false;
    this.eachInActiveVendorEmployees=false;
    this.eachEmployeeInvoice=true;
    this.eachVendorInvoice=false;
    this.allVendor=false;
    this.vendorService.getEmployeeInvoices().then(employeeInvoices => this.employeeInvoices = employeeInvoices);
  }
}
