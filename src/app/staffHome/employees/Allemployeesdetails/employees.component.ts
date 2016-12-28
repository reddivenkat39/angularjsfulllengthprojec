import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {Employee} from "../Employee";
import {DataTable} from "primeng/components/datatable/datatable";
import {ToastrService, ToastConfig} from "toastr-ng2";
import {ToastsManager} from "ng2-toastr";
import {Router} from "@angular/router";
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
  subContEmployees:Employee[]=[];
  orderedEmployees : Employee[] = [];
  selectedEmployee: Employee;
  empId:'';

  tableHeader : string = "";//table Header value based on the selection
  showTerminateDt : boolean = true;//dont show terminate date for Active employees
  //in current iteration this feature is removed
  // showAddSave : boolean = true;//show Add and save buttons in Active employees

  exportFileName:string=""; //based on the sub tabs export file name

  constructor(private employeeService: EmployeeService, private toastManager: ToastsManager, private router: Router) {
  }

  ngOnInit() {
    this.loadEmployees("Active");

    $("ul li").click(function () {
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
    });
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
          this.subContEmployees=[];
          this.orderedEmployees = [];
          res.datares.filter(row => {
            if (row.termDate == null) {//active employees
              this.activeEmployees.push(row);
            }else {//inactive employees
              this.inActiveEmployees.push(row);
            }
            if(row.subCont == "YES"){//sub contract employees
              this.subContEmployees.push(row);
            }
          });
          console.log("employees.components : loademployes: getAllEmployeeDetails: All employess : ", this.allEmployees);
          console.log("employees.components : loademployes: getAllEmployeeDetails: All Active Employes : ", this.activeEmployees);
          console.log("employees.components : loademployes: getAllEmployeeDetails: All In Active Employess : ", this.inActiveEmployees);
          console.log("employees.components : loademployes: getAllEmployeeDetails: All SubCont Employess : ", this.subContEmployees);
        }
        else {
          console.log("employees.components : loadEmployees :  getAllEmployeeDetails Error in response : ", res.errorres);
          this.toastManager.error(res.errorres, 'Data Fetching Failed');
        }
        this.orderedEmployees = this.activeEmployees.concat(this.inActiveEmployees);
        console.log("employees.components : loademployes: getAllEmployeeDetails: ordered employess : ", this.orderedEmployees);
        this.loadFilteredData(filter);
      }
    );
  }

  loadFilteredData(filter : string){
    switch(filter)
    {
      case "All" :
        this.tableHeader = "All Employees";
        this.filteredEmployes = this.orderedEmployees;
        this.showTerminateDt = true;
        /*this.showAddSave = false;*/
        this.exportFileName="All Employees";
        console.log("Filtered employess : All:", this.filteredEmployes);
        break;

      case "Active" :
        this.tableHeader = "Active Employees";
        this.filteredEmployes = this.activeEmployees;
        this.showTerminateDt = false;
        /*this.showAddSave = true;*/
        this.exportFileName="Active Employees";
        console.log("Filtered employess: Active :", this.filteredEmployes);
        break;

      case "InActive" :
        this.tableHeader = "Terminated Employees";
        this.filteredEmployes = this.inActiveEmployees;
        this.showTerminateDt = true;
       /* this.showAddSave = false;*/
        this.exportFileName="Terminated Employees";
        console.log("Filtered employess : InActive :", this.filteredEmployes);
        break;
      case "SubCont":
        this.tableHeader = "SubContract Employees";
        this.filteredEmployes = this.subContEmployees;
        this.showTerminateDt = true;
        /*this.showAddSave = false;*/
        this.exportFileName="SubCont Employees";
        console.log("Filtered employess : SubCont:", this.filteredEmployes);
        break;
    }
    this.defaultFirstRowSelect();
  }

  defaultFirstRowSelect() {
    //default first row selection
    console.log("defaultFirstRowSelect :selectedEmployee", this.selectedEmployee );
    this.selectedEmployee = this.filteredEmployes[0];
    this.onEmployeeRowSelect(this.selectedEmployee.empId);
  }

  onEmployeeRowSelect(empId) {
    console.log("Employee.Component : onEmployeeRowSelect : empId :", empId);
    //get the full details of the selected employee
    this.employeeService.getempDetailedViewComponent_empId(empId);
  }

  //onclick last name of each employee
  onClickLastName(empIdOnClickLastName: Employee) {
    this.empId = empIdOnClickLastName.empId;
    console.log("emp id", this.empId);
    //onClickLastName method navigate to view by id route
    this.router.navigateByUrl('/employees/detailedviewby/'+this.empId);
  }
}
