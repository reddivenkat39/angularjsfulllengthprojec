import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {Employee} from "../Employee";
import {DataTable} from "primeng/components/datatable/datatable";
import {ToastrService, ToastConfig} from "toastr-ng2";
import {ToastsManager} from "ng2-toastr";
declare var $:any;

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
  private viewEmployee=false;
  allEmployees: Employee[];
  allActiveEmployees: Employee[];
  allInactiveEmployees: Employee[];
  empId:'';
  isTermDate = '';
  selectedEmployee: Employee;
  private viewEmployeeAddressDetails ={
    'empId':'',
    'addrLine1':'',
    'city':'',
    'state':'',
    'zipCd':'',

  };
  private viewEmployeeContactDetails ={
    'mobilePhone':'',
    'homePhone':'',
    'homeEmail':'',
  };

  constructor(private employeeService: EmployeeService, private toastManager: ToastsManager ) {
  }

  ngOnInit(){
    this.onAllActiveClicked();
    $("ul li").click(function() {
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
    });
  }


  onAllEmployeeClicked() {
    this.allEmployee = true;
    this.allActive = false;
    this.allInActive = false;


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
          this.toastManager.error(res.errorres,'No data Found');
        } else {
          console.log("server problem ");
          this.toastManager.info('Oops!','Server Problem please Try Again');
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
          this.allActiveEmployees = res.datares.filter(row =>  {
            if(row.termDate == null)
            return row;
          });


        } else if (res.successres != null) {
          console.log("success ", res.successres);
        } else if (res.errorres != null) {
          console.log("OOPs no data  found", res.errorres);
        } else {
          console.log("server problem ");
          this.toastManager.info('Oops!','Server Problem please Try Again');
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
          this.allInactiveEmployees = res.datares.filter(row =>  {
            if(row.termDate != null)
              return row;
          });


        } else if (res.successres != null) {
          console.log("success ", res.successres);
        } else if (res.errorres != null) {
          console.log("OOPs no data  found", res.errorres);
        } else {
          console.log("server problem ");
          this.toastManager.info('Oops!','Server Problem please Try Again');
        }
      }
    );

  }


  onClickView(eachEmployeeDetailId: Employee){
    this.viewEmployee=true;
    console.log("on click eachEmployeeDetailId");
    this.empId=eachEmployeeDetailId.empId;
    console.log(eachEmployeeDetailId);
    console.log("employee Id"+this.empId);
    console.log("view clicked");

    this.employeeService.getDetailedViewEachEmployee(this.empId).subscribe(
      res=>{
        if (res.datares != null) {
          console.log("yes getting data of each employee details ", res.datares.empAddrDtls.empId);
            this.viewEmployeeContactDetails=res.datares.empContacts;
            this.viewEmployeeAddressDetails= res.datares.empAddrDtls;

            console.log("view employee address details by id",this.viewEmployeeContactDetails);

        } else if (res.successres != null) {
          console.log("success ", res.successres);
        } else if (res.errorres != null) {
          console.log("OOPs no data  found", res.errorres);
          this.toastManager.error(res.errorres,'No data Found');
        } else {
          console.log("server problem ");
          this.toastManager.info('Oops!','Server Problem please Try Again');
        }
      }
    );
  }
}
