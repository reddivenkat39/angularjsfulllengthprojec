import {Component, OnInit, Input} from '@angular/core';
import {Education} from "../model/Education";
import {Contact} from "../model/Contact";
import {EmpCrudTabsService} from "../../../emp-crud-tabs.service";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector   : 'app-emp-cont-dtls',
  templateUrl: './emp-cont-dtls.component.html',
  styleUrls  : ['./emp-cont-dtls.component.css']
})
export class EmpContDtlsComponent implements OnInit {
  @Input() employeeId: string;

  showContAddForm: boolean = false;

  selectedContact: Contact[];
  getContactData: Contact[] = [] // pull the contact data

  /*
   to insert contact data by employee id
   */
  insertContData = {
    'empId'       : '',
    'homeEmail'   : '',
    'homePhone'   : '',
    'mobilePhone' : '',
    'workEmail'   : '',
    'workPhone'   : '',
    'emergCntName': '',
    'emergCntNum1': '',
    'emergCntNum2': ''
  };

  constructor(private empCrudTabsService: EmpCrudTabsService, private toastManager: ToastsManager) {

  }

//to load the EmpContDtlsComponent loadContData();
  ngOnInit() {
    console.log("this.insertContData.empId from eachemployeedetails component  : ", this.employeeId);
    this.loadContData(this.employeeId);
    // this.insertContData.empId = this.employeeId;
  }


  //to show the Add Contact details Form
  addContData() {
    this.showContAddForm = true;
  }


//to close the Add contact details Form
  closeContDataForm() {
    this.showContAddForm = false;
  }


  /*
   to load all the contact information by employee id
   */
  loadContData(employeeId) {
    this.empCrudTabsService.getContDtls(employeeId).subscribe(
      res => {
        if (res.datares != null && res.errores == null) {
          console.log("data response by  loadContData : getContDtls ", res.datares);
          this.getContactData = res.datares;
        } else {
          console.log("error response  by loadContData : getContDtls ", res.errorres);
          this.toastManager.error(res.errores,'');
        }
      }
    );
  }


  /*
   to insert the Contact information by employee id
   */
  saveContData() {
    this.empCrudTabsService.insertEmpContDtlsByEmpId(this.insertContData).subscribe(
      res => {
        if (res.successres != null && res.errorres == null) {
          console.log("success response is  :", res.successres);
          this.toastManager.info(res.successres);
        } else {
          console.log("errorres response is :");
          this.toastManager.warning(res.errorres);
        }
      }
    );
  }
}


