import {Component, OnInit, Input} from '@angular/core';
import {EmpCrudTabsService} from "../../emp-crud-tabs.service";

@Component({
  selector   : 'app-emp-edu-dtls',
  templateUrl: 'emp-edu-dtls.component.html',
  styleUrls  : ['emp-edu-dtls.component.css']
})
export class EmpEduDtlsComponent implements OnInit {
  @Input() employeeId: String;


  constructor(private empCrudTabsService: EmpCrudTabsService) {
  }

  ngOnInit() {
    console.log(" employee Id from eachEmployeeDetails : ", this.employeeId);
    this.loadEmpEducationDetailsByEmpId(this.employeeId);
  }


  loadEmpEducationDetailsByEmpId(empId) {
    console.log("empId in loadEmpEducationDetailsByEmpId : ", empId);
    this.empCrudTabsService.getEmpEduDtlsByEmpId(empId).subscribe(
     res=>{
       if(res.datares!=null && res.errorres==null){
         console.log("res.datares from loadEmpEducationDetailsByEmpId :  ",res.datares );
       }else{
         console.log("error response from loadEmpEducationDetailsByEmpId :", res.errorres);
       }
     }
    );
  }


}
