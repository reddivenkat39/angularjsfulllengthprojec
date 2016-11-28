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
  @ViewChild(('dt2')) dataTableX: DataTable;

  private allEmployee = false;
  private allActive = false;
  private allInActive = false;
  allEmployees: Employee[];
  allActiveEmployees: Employee[];
  allInactiveEmployees: Employee[];

  isTermDate = '';

  constructor(private employeeService: EmployeeService, private toastManager: ToastsManager ) {
  }

  ngOnInit() {
    // this.dataTableX.filterDelay = 2147483647;
  }


  onAllEmployeeClicked() {
    this.allEmployee = !this.allEmployee;
    this.allActive = false;
    this.allInActive = false;
    let errorConfig = new ToastConfig();
    errorConfig.timeOut=0;
    this.employeeService.getAllEmployeeDetails().subscribe(
      res => {
        if (res.datares != null) {
          console.log("yes getting data ", res.datares);
          this.toastManager.info('Employeedata','got the employee data');
          // this.toastrService.success('Hello world!', 'Toastr fun!',errorConfig);
          this.allEmployees = res.datares;
          console.log("term date ...", res.datares);

        } else if (res.successres != null) {
          console.log("success ", res.successres);
        } else if (res.errorres != null) {
          console.log("OOPs no data  found", res.errorres);
          this.toastManager.error(res.errorres,'No data Found');
        } else {
          console.log("server problem ");
        }
      }
    );
  }

  onAllActiveClicked() {
    this.allActive = !this.allActive;
    this.allEmployee = false;
    this.allInActive = false;
    this.employeeService.getAllEmployeeDetails().subscribe(
      res => {
        if (res.datares != null) {
          console.log("yes getting data ", res.datares);
          // this.allActiveEmployees = res.datares;

          console.log("term date", this.allActiveEmployees);
          if (res.datares.termDate === null ) {
            console.log("inactive employees got")
            console.log("datares.termDate is equals to null",res.datares.array.values());
          }
          else {
            console.log("datares.termDate is equals to null",res.datares.array.values());
            this.allEmployees = res.datares;
            console.log("inactive employees got it,", res.datares.Array[0].Object);
          }

        } else if (res.successres != null) {
          console.log("success ", res.successres);
        } else if (res.errorres != null) {
          console.log("OOPs no data  found", res.errorres);
        } else {
          console.log("server problem ");
        }
      }
    );

  }

  onAllInActiveClicked() {
    this.allInActive = !this.allInActive;
    this.allActive = false;
    this.allEmployee = false;
  }

}
