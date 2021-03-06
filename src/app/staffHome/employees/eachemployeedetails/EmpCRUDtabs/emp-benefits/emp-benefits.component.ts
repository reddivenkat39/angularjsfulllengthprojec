import {Component, OnInit, Input} from '@angular/core';
import {Benefits} from "../model/Benefits";
import {EmpCrudTabsService} from "../../../emp-crud-tabs.service";
import {ToastsManager} from "ng2-toastr";
declare var $:any;

@Component({
  selector: 'app-emp-benefits',
  templateUrl: './emp-benefits.component.html',
  styleUrls: ['./emp-benefits.component.css']
})
export class EmpBenefitsComponent implements OnInit {
  @Input() employeeId: string;
  vaccination : Benefits[]=[];
  insurance: Benefits[]=[];
  emp_401k : Benefits[]=[];


  isVaccSelected : boolean = false;
  isInsurSelected : boolean = false;
  is401kSelected : boolean = false;




  constructor(private empCrudTabsService: EmpCrudTabsService, private toastManager: ToastsManager) { }

  ngOnInit() {
    /*this.loadFilteredData('INS');*/
    $("ul li").click(function () {
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
    });
   /* this.loadEmpBenefits();*/
  }


  /*loadFilteredData(filter: string) {
    switch (filter) {
      case 'VACC':
        this.isVaccSelected = true;
        this.is401kSelected=false;
        this.isInsurSelected=false;
        break;
      case 'INS':
        this.isInsurSelected = true;
        this.isVaccSelected = false;
        this.is401kSelected=false;
        break;

      case '401K':
        this.is401kSelected = true;
        this.isInsurSelected = false;
        this.isVaccSelected = false;
        break;
    }
    this.loadEmpBenefits();
  }*/


    /*loadEmpBenefits() {
      this.empCrudTabsService.getBenefitDtls(this.employeeId).subscribe(
        res => {
          console.log("Emp benefits Dtls");
          if (res.datares != null && res.errorres == null) {
            this.vaccination = res.datares;
            this.emp_401k = res.datares;
            this.insurance = res.datares;
          } else {
            this.toastManager.error(res.errorres);
          }
        }
      );
    }*/
  }


