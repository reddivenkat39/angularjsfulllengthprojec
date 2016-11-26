import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {Employee} from "../Employee";

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
  allEmployees: Employee[];
  allActiveEmployees: Employee[];
  isTermDate = '';

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {

  }


  onAllEmployeeClicked() {
    this.allEmployee = !this.allEmployee;
    this.allActive = false;
    this.allInActive = false;
    this.employeeService.getAllEmployeeDetails().subscribe(
      res => {
        if (res.datares != null) {
          console.log("yes getting data ", res.datares);
          this.allEmployees = res.datares;
          console.log("term date ...", res.datares);

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
          if (res.datares.termDate === null || res.datares.termDate.equals('')) {
            console.log("inactive employees got")
          }
          else {
            this.allEmployees = res.datares;

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
