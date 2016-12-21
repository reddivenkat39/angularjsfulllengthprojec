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
  filteredEmployes : Employee[] =[];
  allEmployees: Employee[] =[];
  activeEmployees: Employee[]=[];
  inActiveEmployees: Employee[]=[];
  fullEmpDtls ={};

  selectedEmployee: Employee;
  private viewEmployeeDetails = {
    'empId': '',
    'empName': '',
    'hireDate': ''
  }
  private viewEmployeeAddressDetails = {};
  private viewEmployeeContactDetails = {};
  private viewEmployeeWorkAddressDetails = {};
  private viewEmployeeMoreInfo={};

  tableHeader : string = "";//table Header value based on the selection
  showTerminateDt : boolean = true;//dont show terminate date for Active employees
  showAddSave : boolean = true;//show Add and save buttons in Active employees

  constructor(private employeeService: EmployeeService, private toastManager: ToastsManager) {
  }

  ngOnInit() {
    this.loadEmployees("Active");

    $("ul li").click(function () {
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
    });
    $(".EachEmployeeEditableDetailsTabs").hide();
  }

  //On component load get all the employees from server and fill the respective fields like allEmployees, activeEmployes, inActiveEmployes
  loadEmployees(filter : string) {
    console.log("employees.components : loademployes for: ", filter);
    this.employeeService.getAllEmployeeDetails().subscribe(
      res => {
        console.log("employees.components : loademployes: getAllEmployeeDetails: response : ", res);
        if (res.datares != null && res.errorres == null) {
          this.allEmployees = res.datares;
          this.activeEmployees =[];
          this.inActiveEmployees =[];
          res.datares.filter(row => {
            if (row.termDate == null) {//active employees
              this.activeEmployees.push(row);
            }
            else{
              this.inActiveEmployees.push(row);
            }
          });
          console.log("employees.components : loademployes: getAllEmployeeDetails: All employess : ", this.allEmployees);
          console.log("employees.components : loademployes: getAllEmployeeDetails: All Active Employes : ", this.activeEmployees);
          console.log("employees.components : loademployes: getAllEmployeeDetails: All In Active Employess : ", this.inActiveEmployees);
        }
        else {
          console.log("employees.components : loadEmployees :  getAllEmployeeDetails Error in response : ", res.errorres);
          this.toastManager.error(res.errorres, 'Data Fetching Failed');
        }
        this.loadFilteredData(filter);
      }
    );
  }

  loadFilteredData(filter : string){
    switch(filter)
    {
      case "All" :
        this.filteredEmployes = this.allEmployees;
        this.tableHeader = "All Employees";
        this.showTerminateDt = true;
        this.showAddSave = false;
        console.log("Filtered employess : All:", this.filteredEmployes);
        break;

      case "Active" :
        this.filteredEmployes = this.activeEmployees;
        this.tableHeader = "Active Employees";
        this.showTerminateDt = false;
        this.showAddSave = true;
        console.log("Filtered employess: Active :", this.filteredEmployes);
        break;

      case "InActive" :
        this.filteredEmployes = this.inActiveEmployees;
        this.tableHeader = "Terminated Employees";
        this.showTerminateDt = true;
        this.showAddSave = false;
        console.log("Filtered employess : InActive :", this.filteredEmployes);
        break;
    }
    this.defaultFirstRowSelect(this);
  }

  defaultFirstRowSelect(context) {
    //TODO: Worst code, Need to refactor later. used setTimeOut because didnt find better way
    setTimeout(() => {
      var firstRowTd = $("table:eq(1) tr:eq(0)").find('td:first');
      // firstRow.click(function(row){
      //   row["empId"] = firstRow.find('td:first').text().trim();
      //   context.onEmployeeRowSelect(row);
      //   firstRow.addClass("ui-state-highlight");
      // });
      firstRowTd.trigger('click');

      //for mouse hover highlight on table
      $("tr").not(':first').hover(
        function () {
          $(this).css("background","#ebedf0");
        },
        function () {
          $(this).css("background","");
        }
      );

    }, 100);
  }

  onEmployeeRowSelect(row) {
    console.log("Employee.Component : onEmployeeRowSelect : row :", row);
    //disable already highlighted row
    $('.ui-state-highlight').removeClass('ui-state-highlight');

    var selectedRow = $(row.target).closest('tr');
    //Find empId value from the selected row
    row["empId"] = selectedRow.find('td:first').text().trim();

    //highlight the selected row
    selectedRow.addClass("ui-state-highlight");

    console.log("Employee.Component : onEmployeeRowSelect : empId : ", row["empId"]);
    //get the full details of the selected employee
    this.employeeService.getFullEmployeeDtlsById(row.empId).subscribe(
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

  onClickLastName(event) {
    console.log(" onClickLastName  error"+event.data.empId);
    // onRowSelectInActiveEmployees(event);
    console.log(" onClickLastName  error"+event.data.empId);

    $("#nav").hide();
    // this.allEmployee = false;
    // this.viewClicked = true;
    // this.allInActive = false;
    // this.allActive = false;
    $(".EachEmployeeEditableDetailsTabs").show();
    $("ul li").click(function () {
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
    });
    // this.onRowSelectActiveEmployees(event.data.empId);
  }


}
/*onClickViewInActive($event, eachEmployeeDetailId: Employee) {
 //TODO : optimise the below line
 if($(".fa-angle-double-down").length > 0) {
 $(".fa-angle-double-down")[0].className = "fa fa-angle-double-right";
 }
 $event.currentTarget.children[0].className = "fa fa-angle-double-down";

 this.employeeService.getEmpWorkAddressById(event.data.empId).subscribe(
 res=>{
 if(res.datares!=null){
 console.log(res.datares," get work address by empid");
 this.viewEmployeeWorkAddressDetails = res.datares[0];
 }else if(res.successres!=null){
 console.log(res.successres," success");
 }else if(res.errorres!=null){
 this.viewEmployeeAddressDetails = '';
 console.log(res.errorres," error");
 }else {

 }
 }
 );
 }


 }*/
