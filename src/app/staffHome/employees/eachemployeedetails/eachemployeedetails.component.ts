import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {ActivatedRoute} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {EmpDetailedViewComponent} from "../emp-detailed-view/emp-detailed-view.component";

@Component({
  selector   : 'app-eachemployeedetails',
  templateUrl: './eachemployeedetails.component.html',
  styleUrls  : ['./eachemployeedetails.component.css']
})
export class EachemployeedetailsComponent implements OnInit {
  empId: '';


  @ViewChild(EmpDetailedViewComponent)
  empDetailedViewComponent: EmpDetailedViewComponent;



  constructor(private employeeService:EmployeeService, private activatedRoute: ActivatedRoute,private toastManager: ToastsManager) {
    this.empId = activatedRoute.snapshot.params['id'];

  }

  ngOnInit() {
    console.log("empDetailedView from empDetailedView component ", this.empDetailedViewComponent);

  }

}
