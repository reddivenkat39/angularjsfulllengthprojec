import {Component, OnInit, Input} from '@angular/core';
import {EmpCrudTabsService} from "../../../emp-crud-tabs.service";
import {Education} from "../model/Education.interface";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector   : 'app-emp-edu-dtls',
  templateUrl: 'emp-edu-dtls.component.html',
  styleUrls  : ['emp-edu-dtls.component.css']
})
export class EmpEduDtlsComponent implements OnInit {
  @Input() employeeId: string;

  showAddForm: boolean = false;


  getEducationData: Education[] = [];  // empty array used to get the all the employee education details


  // insert Education Data object
  eduData = {
    'empId'            : '',
    'qualificationName': '',
    'instituteName'    : '',
    'gradYear'         : '',
    'gpaPct'           : ''
  };

  constructor(private empCrudTabsService: EmpCrudTabsService, private toastManager: ToastsManager) {
  }


  /*
   on page loading  loadEmpEducationDetailsByEmpId
   */
  ngOnInit() {
    console.log(" employee Id from eachEmployeeDetails : ", this.employeeId);
    this.loadEmpEducationDetailsByEmpId(this.employeeId);
    this.eduData.empId = this.employeeId;
  }


  // trackByIndex(index: number, obj: any): any {
  //   return index;
  // }


  /*
   to show the Add Edu Form
   */
  addEduData() {
    this.showAddForm = true;
  }

  /*
   to close the Add Edu Form
   */
  closeEduDataForm() {
    this.showAddForm = false;
  }


  /*
   to save the Edu Data
   */
  saveEduData() {
    console.log("saveEducation Data : this.eduData : ", this.eduData);
    this.empCrudTabsService.insertEmpEduDtlsByEmpId(this.eduData).subscribe(
      res => {
        if (res.successres != null && res.errorres == null) {
          console.log("data inserted", res.successres);

          this.loadEmpEducationDetailsByEmpId(this.eduData.empId);
          this.toastManager.info(res.successres, '');
        } else {
          console.log("data inserted", res.errorres);
          this.toastManager.info(res.errorres, '');
        }
      }
    );
  }


  /*
   to pull the Employee Education By Employee Id
   */
  loadEmpEducationDetailsByEmpId(empId) {
    console.log("empId in loadEmpEducationDetailsByEmpId : ", empId);
    this.empCrudTabsService.getEmpEduDtlsByEmpId(empId).subscribe(
      res => {
        if (res.datares != null && res.errorres == null) {
          this.getEducationData = res.datares;
          console.log("res.datares from loadEmpEducationDetailsByEmpId :  ", res.datares);
        } else {
          console.log("error response from loadEmpEducationDetailsByEmpId :", res.errorres);
        }
      }
    );
  }


}
