import {Component, OnInit, EventEmitter, Output, ViewChild} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-eachemployeedetails',
  templateUrl: './eachemployeedetails.component.html',
  styleUrls: ['./eachemployeedetails.component.css']
})
export class EachemployeedetailsComponent implements OnInit {
  value = '';
 empId: string ='';




  constructor(private employeeService:EmployeeService, private activatedRoute: ActivatedRoute) {
    this.empId = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    console.log("EachemployeedetailsComponent   :  ngOnInit invoked : and captured from route param empId :", this.empId);
    this.employeeService.getempDetailedViewComponent_empId(this.empId);

    // this.onClickLastName.emit(this.empId);
    // this.employeeService.empDetailedViewComponent_empId.subscribe(
    //   data=>{
    //
    //   }
    // );

  }
}
