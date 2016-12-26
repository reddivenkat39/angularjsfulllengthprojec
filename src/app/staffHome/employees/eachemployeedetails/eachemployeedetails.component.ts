import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../employee.service";
import {ActivatedRoute} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {EmpVendorService} from "./EmpCRUDtabs/emp-vendor-dtls/emp-vendor-dtld.service"
import {empvendor} from "./EmpCRUDtabs/emp-vendor-dtls/emp-vendor-model"
@Component({
  selector: 'app-eachemployeedetails',
  templateUrl: './eachemployeedetails.component.html',
  styleUrls: ['./eachemployeedetails.component.css']
})
export class EachemployeedetailsComponent implements OnInit {
  empId:'';
  constructor(private employeeService:EmployeeService, private activatedRoute: ActivatedRoute,private toastManager: ToastsManager
  ,private employeevendorService : EmpVendorService) {
    this.empId = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {

  }

  onSelectTab(event){

  }


}
