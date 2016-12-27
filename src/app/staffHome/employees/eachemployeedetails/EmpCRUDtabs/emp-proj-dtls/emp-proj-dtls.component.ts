import { Component, OnInit, Input } from '@angular/core';
import {EmpCrudTabsService} from "../../../emp-crud-tabs.service";
import {ToastsManager} from "ng2-toastr";
import {Project} from "../model/Project.interface";

@Component({
  selector: 'app-emp-proj-dtls',
  templateUrl: './emp-proj-dtls.component.html',
  styleUrls: ['./emp-proj-dtls.component.css']
})
export class EmpProjDtlsComponent implements OnInit {
  @Input() employeeId: string;

  getProjectData: Project[] = [];  // empty array used to get the all the employee projects details
  getProjectDataCurrent:Project[]=[];//curret project data
  getProjectDataPrevious:Project[]=[];//previous project data
  constructor(private empCrudTabsService: EmpCrudTabsService, private toastManager: ToastsManager) { }

  ngOnInit() {
    console.log(" employee Id from eachEmployeeDetails : ", this.employeeId);
    this.loadEmpProjectsDetailsByEmpId(this.employeeId);
    // this.eduData.empId = this.employeeId;
  }

  /*
   to pull the Employee Projects By Employee Id
   */
  loadEmpProjectsDetailsByEmpId(empId) {
    console.log("empId in loadEmpProjectsDetailsByEmpId : ", empId);
    this.empCrudTabsService.getEmpProjDtlsByEmpId(empId).subscribe(
      res => {
        if (res.datares != null && res.errorres == null) {
          this.getProjectDataCurrent = res.datares.filter(row => {
            if (row.endDate == null)
              return row;
          });
          this.getProjectDataPrevious = res.datares.filter(row => {
            if (row.endDate != null)
              return row;
          });

          console.log("res.datares from loadEmpProjectsDetailsByEmpId :  ", res.datares);
        } else {
          console.log("error response from loadEmpProjectsDetailsByEmpId :", res.errorres);
        }
      }
    );
  }

  showDialogToAdd(){

  }
}
