import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {ActivatedRoute} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {EmpDetailedViewComponent} from "../emp-detailed-view/emp-detailed-view.component";

@Component({
  selector   : 'app-eachemployeedetails',
  templateUrl: './eachemployeedetails.component.html',
  styleUrls  : ['./eachemployeedetails.component.css']
})
export class EachemployeedetailsComponent implements OnInit {
  empId: '';


  @ViewChild(EmpDetailedViewComponent)
  empDetailedViewComponent: EmpDetailedViewComponent;

  /*
   switch cases for Selecting Tabs
   */
  isEduSelected: boolean = false;
  isContSelected: boolean = false;
  isAddrSelected: boolean = false;
  isBenefitSelected : boolean = false;


  constructor(private employeeService: EmployeeService, private activatedRoute: ActivatedRoute, private toastManager: ToastsManager) {
    this.empId = activatedRoute.snapshot.params['id'];

  }

  ngOnInit() {
    this.onSelectTab('EDU');
    console.log("empDetailedView from empDetailedView component ", this.empDetailedViewComponent);

  }

  onSelectTab(selectedTab: string) {
    switch (selectedTab) {
      case 'EDU':
        this.isEduSelected = true;
        this.isContSelected = false;
        this.isAddrSelected = false;
        this.isBenefitSelected= false;
        break;
      case 'CONT':
        this.isContSelected = true;
        this.isEduSelected = false;
        this.isAddrSelected = false;
        this.isBenefitSelected= false;
        break;
      case 'ADDR':
        this.isAddrSelected = true;
        this.isEduSelected = false;
        this.isContSelected = false;
        this.isBenefitSelected= false;
        break;
      case 'BEN':
        this.isAddrSelected = false;
        this.isEduSelected = false;
        this.isContSelected = false;
        this.isBenefitSelected= true;
        break;
    }


    console.log(" event in app-eachemployeedetails : ", event);
    console.log(" employee id from route  in app-eachemployeedetails : ", this.empId);
  }

}
