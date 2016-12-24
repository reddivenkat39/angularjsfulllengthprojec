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
  constructor(private employeeService:EmployeeService, private activatedRoute: ActivatedRoute,private toastManager: ToastsManager) {
    this.empId = activatedRoute.snapshot.params['id'];

  }

  ngOnInit() {
  }

  onSelectTab(event){
    console.log(" event in app-eachemployeedetails : ",event);
    console.log(" employee id from route  in app-eachemployeedetails : ",this.empId);
  }

}
