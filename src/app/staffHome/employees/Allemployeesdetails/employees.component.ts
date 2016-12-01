import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {Employee} from "../Employee";
import {DataTable} from "primeng/components/datatable/datatable";
import {ToastrService, ToastConfig} from "toastr-ng2";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector     : 'app-employees',
  templateUrl  : 'employees.component.html',
  styleUrls    : ['employees.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeesComponent implements OnInit {


  private allEmployee = false;
  private allActive = false;
  private allInActive = false;
  private allSubCont = false;
  private viewEmployee = false;
  allEmployees: Employee[];
  allActiveEmployees: Employee[];
  allInactiveEmployees: Employee[];

  isTermDate = '';
  private viewEmployeeDetails = {
    'mobilePhone': '',
    'addrLine1'  : '',
    'homeEmail'  : '',
    'city'       : '',
    'homePhone'  : '',
    'state'      : '',
    'zipCd'      : '',

  };

  constructor(private employeeService: EmployeeService, private toastManager: ToastsManager) {
  }

  ngOnInit() {
    this.onAllActiveClicked();
  }


  onAllEmployeeClicked() {
    this.allEmployee = true;
    this.allActive = false;
    this.allInActive = false;
    let errorConfig = new ToastConfig();
    errorConfig.timeOut = 0;
    this.employeeService.getAllEmployeeDetails().subscribe(
      res => {
        if (res.datares != null) {
          console.log("yes getting data ", res.datares);
          // this.toastManager.info('Employeedata','got the employee data');
          // this.toastrService.success('Hello world!', 'Toastr fun!',errorConfig);
          this.allEmployees = res.datares;
          console.log("term date ...", res.datares);

        } else if (res.successres != null) {
          console.log("success ", res.successres);
        } else if (res.errorres != null) {
          console.log("OOPs no data  found", res.errorres);
          this.toastManager.error(res.errorres, 'No data Found');
        } else {
          console.log("server problem ");
          this.toastManager.info('Oops!', 'Server Problem please Try Again');
        }
      }
    );
  }

  onAllActiveClicked() {
    this.allActive = true;
    this.allEmployee = false;
    this.allInActive = false;
    this.employeeService.getAllEmployeeDetails().subscribe(
      res => {
        if (res.datares != null) {
          console.log("yes getting data ", res.datares);
          this.allActiveEmployees = res.datares.filter(row => {
            if (row.termDate == null)
              return row;
          });


        } else if (res.successres != null) {
          console.log("success ", res.successres);
        } else if (res.errorres != null) {
          console.log("OOPs no data  found", res.errorres);
        } else {
          console.log("server problem ");
          this.toastManager.info('Oops!', 'Server Problem please Try Again');
        }
      }
    );

  }

  onAllInActiveClicked() {
    this.allInActive = true;
    this.allActive = false;
    this.allEmployee = false;
    this.employeeService.getAllEmployeeDetails().subscribe(
      res => {
        if (res.datares != null) {
          console.log("yes getting data ", res.datares);
          this.allInactiveEmployees = res.datares.filter(row => {
            if (row.termDate != null)
              return row;
          });


        } else if (res.successres != null) {
          console.log("success ", res.successres);
        } else if (res.errorres != null) {
          console.log("OOPs no data  found", res.errorres);
        } else {
          console.log("server problem ");
          this.toastManager.info('Oops!', 'Server Problem please Try Again');
        }
      }
    );

  }

  onClickView() {
    console.log("view clicked");
    this.viewEmployee = true;
    // this.employeeService.getDetailedViewEachEmployee(this.viewEmployeeDetails).subscribe(
    //   res=>{
    //     if (res.datares != null) {
    //       console.log("yes getting data of each employee details ", res.datares);
    //     } else if (res.successres != null) {
    //       console.log("success ", res.successres);
    //     } else if (res.errorres != null) {
    //       console.log("OOPs no data  found", res.errorres);
    //       this.toastManager.error(res.errorres,'No data Found');
    //     } else {
    //       console.log("server problem ");
    //       this.toastManager.info('Oops!','Server Problem please Try Again');
    //     }
    //   }
    // );
  }


}
