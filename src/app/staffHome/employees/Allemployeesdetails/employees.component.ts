import { Component, OnInit } from '@angular/core';
import { EmployeeService} from "../employee.service";

@Component({
  selector: 'app-employees',
  templateUrl: 'employees.component.html',
  styleUrls: ['employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getAllEmployeeDetails().subscribe(
    res=>{
      if(res.datares!=null){
       console.log("yes getting data ", res.datares);

      }else if(res.successres!=null){
        console.log("success ", res.successres);
      }else if(res.errorres!=null){
        console.log("OOPs no data  found", res.errorres);
      }else{
        console.log("server problem ");
      }
    }
    );
  }

}
