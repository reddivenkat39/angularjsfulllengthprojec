import {Component, OnInit, Input} from '@angular/core';
import {EmpCrudTabsService} from "../../../emp-crud-tabs.service";
import {Education} from "../model/Payroll";
import {ToastsManager} from "ng2-toastr";


@Component({
  selector: 'app-emp-pay-roll',
  templateUrl: './emp-pay-roll.component.html',
  styleUrls: ['./emp-pay-roll.component.css']
})
export class EmpPayRollComponent implements OnInit {
@Input() employeeId: string;

    displayDialog: boolean;
    newPayrollData: boolean;


    selectedPayroll: Education[];
    getPayrollData: Education[] = [];  // empty array used to get the all the employee education details


    // insert Education Data object
    payrollData = {
            empId   : '',
            payRate : '',
            packge : '',
            effDt : '',
            endDt : ''
    };

    constructor(private empCrudTabsService: EmpCrudTabsService, private toastManager: ToastsManager) {
    }

  ngOnInit() {
       this.loadPayrollDetailsByEmpId(this.employeeId);
  }
    showDialogToAdd() {
        this.newPayrollData = true;
        this.displayDialog = true;
        console.log(" showDialogToAdd : invoked");
    }

    //   to save the Payroll Data
    savePayrollData() {
        console.log("savePayrollData : this.payrollData : ", this.payrollData);
        this.empCrudTabsService.insertEmpEduDtlsByEmpId(this.payrollData).subscribe(
            res => {
                if (res.successres != null && res.errorres == null) {
                    console.log("data inserted", res.successres);

                    this.loadPayrollDetailsByEmpId(this.payrollData.empId);
                    this.toastManager.info(res.successres, '');
                } else {
                    console.log("data inserted", res.errorres);
                    this.toastManager.info(res.errorres, '');
                }
            }
        );
    }


//     to pull the Payroll details By Employee Id
    loadPayrollDetailsByEmpId(empId) {
        console.log("empId in loadPayrollDetailsByEmpId : ", empId);
        this.empCrudTabsService.getEmpPayrollByEmpId(empId).subscribe(
            res => {
                console.log("EmpPayRollComponent : loadEmpPayrollByEmpId : response : ", res);
                if (res.datares != null && res.errorres == null) {
                    this.getPayrollData = res.datares;
                } else {
                    console.log("error response from loadPayrollDetailsByEmpId :", res.errorres);
                }
            }
        );
    }

}
