import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../employee.service";
import {ActivatedRoute} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
@Component({
  selector: 'app-eachemployeedetails',
  templateUrl: './eachemployeedetails.component.html',
  styleUrls: ['./eachemployeedetails.component.css']
})
export class EachemployeedetailsComponent implements OnInit {
  empId:'';

  /*
  switch cases for Selecting Tabs
   */
isEduSelected: boolean = false;
isContSelected: boolean = false;
isVendorSelelcted : boolean = false;
isWorkAuthSelected : boolean = false;


  constructor(private employeeService:EmployeeService, private activatedRoute: ActivatedRoute,private toastManager: ToastsManager) {
    this.empId = activatedRoute.snapshot.params['id'];

  }

  ngOnInit() {
    this.onSelectTab('EDU');
  }

  onSelectTab(selectedTab: string){
    this.isEduSelected=false;
    this.isContSelected= false;
    this.isVendorSelelcted = false;
    this.isWorkAuthSelected = false;
    switch(selectedTab){
      case 'EDU':
      this.isEduSelected=true;
        break;
      case 'CONT':
      this.isContSelected= true;
        break;
      case 'VEND':
          this.isVendorSelelcted = true;
          break;
      case 'WAUTH':
        this.isWorkAuthSelected = true;
        break;
    }


    console.log(" event in app-eachemployeedetails : ",event);
    console.log(" employee id from route  in app-eachemployeedetails : ",this.empId);
  }

}
