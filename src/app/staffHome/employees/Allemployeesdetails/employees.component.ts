import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {Employee} from "../Employee";
import {DataTable} from "primeng/components/datatable/datatable";
import {ToastrService, ToastConfig} from "toastr-ng2";
import {ToastsManager} from "ng2-toastr";

declare var $: any;

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
  private viewClicked = false;
  private viewActiveEmployee = false;
  private viewAllEmployee = false;
  private viewInActiveEmployee = false;
  allEmployees: Employee[];
  allActiveEmployees: Employee[];
  allInactiveEmployees: Employee[];
  empId: '';
  isTermDate = '';
  selectedEmployee: Employee;
  private viewEmployeeDetails = {
    'empId'  : '',
    'empName': '',
    'hireDate': ''
  }
  private viewEmployeeAddressDetails = {};
  private viewEmployeeContactDetails = {};

  constructor(private employeeService: EmployeeService, private toastManager: ToastsManager) {
  }

  ngOnInit() {
    this.onAllActiveClicked();
    $("ul li").click(function () {
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
    });
    $("a .ui-paginator-first .ui-paginator-element").addClass("hide");

  }


  onAllEmployeeClicked() {
    this.allEmployee = true;
    this.allActive = false;
    this.allInActive = false;
    this.viewInActiveEmployee = false;
    this.viewActiveEmployee = false;
    this.employeeService.getAllEmployeeDetails().subscribe(
      res => {
        if (res.datares != null) {
          console.log("yes getting data ", res.datares);
          // this.toastManager.info('Employeedata','got the employee data');
          // this.toastrService.success('Hello world!', 'Toastr fun!',errorConfig);
          // if(res.datares.midName == "NULL"){
          //   this.allEmployees = res.datares;
          // }
          this.allEmployees = res.datares;


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
    this.viewAllEmployee = false;
    this.viewInActiveEmployee = false;
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
    this.viewActiveEmployee = false;
    this.viewAllEmployee = false;
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


  onRowSelectActiveEmployees(event) {
    console.log("on row select", event.data.empId);
    this.viewActiveEmployee = true;
    this.viewAllEmployee = false;
    this.viewInActiveEmployee = false;
    this.viewClicked = !this.viewClicked;
    this.employeeService.getDetailedViewEachEmployee(event.data.empId).subscribe(
      res => {
        if (res.datares != null) {
          console.log("yes getting data of each employee details ", res.datares.empAddrDtls);
          this.viewEmployeeDetails.empName = res.datares.firstName + ' ' + res.datares.lastName;
          console.log(this.viewEmployeeDetails.empName);
          if (res.datares.empContacts[0] != null) {
            this.viewEmployeeContactDetails = res.datares.empContacts[0];
            console.log(this.viewEmployeeContactDetails);
          } else {
            console.log(this.viewEmployeeContactDetails, 'contact details not found');
            this.viewEmployeeContactDetails = '';
          }


          if(res.datares!=null){
            this.viewEmployeeDetails.hireDate = res.datares.hireDate;
          }else{
            this.viewEmployeeDetails.hireDate = '';
          }


          if (res.datares.empAddrDtls[0] != null) {
            this.viewEmployeeAddressDetails = res.datares.empAddrDtls[0];
          }
          else {
            console.log(this.viewEmployeeAddressDetails, 'addresss details not found');
            this.viewEmployeeAddressDetails = '';
          }

          //   Array.prototype.slice.call(res.datares.empAddrDtls,0);
          // console.log("view employee address details by id",this.viewEmployeeAddressDetails);

        }
        else if (res.successres != null) {
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

  onRowSelectAllEmployees(event) {
    this.viewAllEmployee = true;
    this.viewInActiveEmployee = false;
    this.viewActiveEmployee = false;
    console.log("on click eachEmployeeDetailId");
    this.viewClicked = !this.viewClicked;
    console.log("view clicked");
    this.employeeService.getDetailedViewEachEmployee(event.data.empId).subscribe(
      res => {
        if (res.datares != null) {
          console.log("yes getting data of each employee details ", res.datares.empAddrDtls);
          this.viewEmployeeDetails.empName = res.datares.firstName + ' ' + res.datares.lastName;
          console.log(this.viewEmployeeDetails.empName);
          if (res.datares.empContacts[0] != null) {
            this.viewEmployeeContactDetails = res.datares.empContacts[0];
            console.log(this.viewEmployeeContactDetails);
          } else {
            console.log(this.viewEmployeeContactDetails, 'contact details not found');
            this.viewEmployeeContactDetails = '';
          }

          if(res.datares!=null){
            this.viewEmployeeDetails.hireDate = res.datares.hireDate;
          }else{
            this.viewEmployeeDetails.hireDate = '';
          }

          if (res.datares.empAddrDtls[0] != null) {
            this.viewEmployeeAddressDetails = res.datares.empAddrDtls[0];
          }
          else {
            console.log(this.viewEmployeeAddressDetails, 'addresss details not found');
            this.viewEmployeeAddressDetails = '';
          }
        }
        else if (res.successres != null) {
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

  onRowSelectInActiveEmployees(event) {
    this.viewInActiveEmployee = true;
    this.viewActiveEmployee = false;
    this.viewAllEmployee = false;
    console.log("on click eachEmployeeDetailId");
    this.viewClicked = !this.viewClicked;
    console.log("view clicked");
    this.employeeService.getDetailedViewEachEmployee(event.data.empId).subscribe(
      res => {
        if (res.datares != null) {
          console.log("yes getting data of each employee details ", res.datares.empAddrDtls);
          this.viewEmployeeDetails.empName = res.datares.firstName + ' ' + res.datares.lastName;
          console.log(this.viewEmployeeDetails.empName);
          if (res.datares.empContacts[0] != null) {
            this.viewEmployeeContactDetails = res.datares.empContacts[0];
            console.log(this.viewEmployeeContactDetails);
          } else {
            console.log(this.viewEmployeeContactDetails, 'contact details not found');
            this.viewEmployeeContactDetails = '';
          }

          if(res.datares!=null){
            this.viewEmployeeDetails.hireDate = res.datares.hireDate;
          }else{
            this.viewEmployeeDetails.hireDate = '';
          }

          if (res.datares.empAddrDtls[0] != null) {
            this.viewEmployeeAddressDetails = res.datares.empAddrDtls[0];
          }
          else {
            console.log(this.viewEmployeeAddressDetails, 'addresss details not found');
            this.viewEmployeeAddressDetails = '';
          }

          //   Array.prototype.slice.call(res.datares.empAddrDtls,0);
          // console.log("view employee address details by id",this.viewEmployeeAddressDetails);

        }
        else if (res.successres != null) {
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
}
