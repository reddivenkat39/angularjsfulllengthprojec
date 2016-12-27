import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../employee.service";
import {ToastsManager} from "ng2-toastr";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-emp-detailed-view',
  templateUrl: './emp-detailed-view.component.html',
  styleUrls: ['./emp-detailed-view.component.css']
})
export class EmpDetailedViewComponent implements OnInit {
  empId:'';
  fullEmpDtls ={'billable':'false'};
  capturedEmpId:'';

  constructor(private employeeService: EmployeeService, private toastManager: ToastsManager,private activatedRoute: ActivatedRoute) {
    this.empId = activatedRoute.snapshot.params['id'];
    this.capturedEmpId=this.empId;
  }

  ngOnInit() {

      this.employeeService.empDetailedViewComponent_empId.subscribe(
        data=> {
          this.getEmpDetailViewById(data);
          console.log("data from eventemitter in empDetailedView: empDetailedViewComponent_empId :", data);
        }
      );
    this.getEmpDetailViewByIdThorughRouteParam(this.empId);

  }
  getEmpDetailViewById(empId: String){
    console.log("data from eventemitter in empDetailedView: empDetailedViewComponent_empId :",empId);
    this.employeeService.getFullEmployeeDtlsById(empId).subscribe(

      res => {
        console.log("Employee.Component : getEmpDetailViewById : getFullEmployeeDtlsById : ", res);

        if (res.errorres ==null && res.datares != null) {
          this.fullEmpDtls =res.datares;
          console.log("Employee.Component : getEmpDetailViewById : getFullEmployeeDtlsById :  fullEmpDtls: ", this.fullEmpDtls);
        }
        else {
          console.log("Employee.Component : getEmpDetailViewById : getFullEmployeeDtlsById :  Error in response: ", res.errorres);
          this.toastManager.error(res.errorres, 'Data Fetching Failed');
        }
      }
    );
  }

  // todo need to be modified or optimized asap
 getEmpDetailViewByIdThorughRouteParam(empId){
    console.log("data from router params in getEmpDetailViewByIdThorughRouteParam:",empId);
    this.employeeService.getFullEmployeeDtlsById(this.empId).subscribe(

      res => {
        console.log("Employee.Component : getEmpDetailViewByIdThorughRouteParam : getFullEmployeeDtlsById : ", res);

        if (res.errorres ==null && res.datares != null) {
          this.fullEmpDtls =res.datares;
          console.log("Employee.Component : getEmpDetailViewByIdThorughRouteParam :  fullEmpDtls: ", this.fullEmpDtls);
        }
        else {
          console.log("Employee.Component : getEmpDetailViewByIdThorughRouteParam :  Error in response: ", res.errorres);
          /*this.toastManager.error(res.errorres, 'Data Fetching Failed');*/
        }
      }
    );
  }

}
