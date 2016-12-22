import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../employee.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-eachemployeedetails',
  templateUrl: './eachemployeedetails.component.html',
  styleUrls: ['./eachemployeedetails.component.css']
})
export class EachemployeedetailsComponent implements OnInit {
  value = '';
  empId:'';
  constructor(private employeeService:EmployeeService, private activatedRoute: ActivatedRoute) {
    this.empId = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.employeeService.pushedId.subscribe(
      data => this.value = data
    );
  }
}
