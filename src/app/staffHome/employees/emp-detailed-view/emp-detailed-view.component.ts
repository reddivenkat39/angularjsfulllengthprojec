import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../employee.service";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-emp-detailed-view',
  templateUrl: './emp-detailed-view.component.html',
  styleUrls: ['./emp-detailed-view.component.css']
})
export class EmpDetailedViewComponent implements OnInit {
private empData={
  'empId':''
}
  fullEmpDtls ={};

  constructor(private employeeService: EmployeeService, private toastManager: ToastsManager) { }

  ngOnInit() {
   this.empData.empId= this.employeeService.empDetailedViewComponent_empId.subscribe(
      data=>{
        this.empData.empId=data
        console.log("data from eventemitter in empDetailedView: empDetailedViewComponent_empId :",this.empData.empId);
      }
    );


  }

  getEmpDetailViewById(empId: String){
    console.log("data from eventemitter in empDetailedView: empDetailedViewComponent_empId :",empId);
    this.employeeService.getFullEmployeeDtlsById(empId).subscribe(

      res => {
        console.log("Employee.Component : onEmployeeRowSelect : getFullEmployeeDtlsById : ", res);

        if (res.errorres ==null && res.datares != null) {
          this.fullEmpDtls =res.datares;
          console.log("Employee.Component : onEmployeeRowSelect : getFullEmployeeDtlsById :  fullEmpDtls: ", this.fullEmpDtls);
        }
        else {
          console.log("Employee.Component : onEmployeeRowSelect : getFullEmployeeDtlsById :  Error in response: ", res.errorres);
          this.toastManager.error(res.errorres, 'Data Fetching Failed');
        }
      }
    );
  }


}
