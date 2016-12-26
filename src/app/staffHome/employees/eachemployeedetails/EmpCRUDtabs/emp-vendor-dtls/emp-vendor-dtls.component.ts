/**
 * Created by venka on 12/24/2016.
 */

import {Component, Input, OnChanges, OnInit} from "@angular/core"
import {EmpVendorService} from "./emp-vendor-dtld.service"
import {empvendor} from "./emp-vendor-model"

@Component({
  selector:'app-empvendordetailed',
  templateUrl :'./emp-vendor-dtld.component.html'
})
export class EmpVendorDetailed implements OnInit{
  @Input() empId:String ='';
  private buttonclicked : String = '';
  EmployeeVendorData : empvendor[] =[];
   EmployeeVendorTerminated :empvendor[]= [];
   EmployeeVendorNotTerminated : empvendor[] = [];
   TerminatedTable : Boolean = true;
   NonTerminateTable : Boolean = true;
  private emp:empvendor;
  displayDialog: boolean;
constructor(private employeevendorService:EmpVendorService){}
  ngOnInit(){
this.LoadDataInTheVendorsEmpTab(this.empId);
  }

LoadDataInTheVendorsEmpTab(empId){
//console.log(" event in app-eachemployeedetails : ",event);
  console.log(" employee id from route  in app-eachemployeedetails : ",empId);

  console.log(this.employeevendorService.SelectedEmpId+"is the empId selected ");

      this.employeevendorService.getEmpVendorRelationData(this.employeevendorService.SelectedEmpId)
        .subscribe(
          data =>{
            this.EmployeeVendorData= data.datares;
            this.EmployeeVendorNotTerminated =  data.datares.filter(
              row => {
                if (row.endDate == null)
                  return row;
              }
            );
            this.EmployeeVendorTerminated =  data.datares.filter(
              row => {
                if (row.endDate != null)
                  return row;
              }
            );
            console.log(data.datares);
            if(this.EmployeeVendorNotTerminated.length == 0){
              console.log(this.EmployeeVendorNotTerminated.length)
              this.NonTerminateTable = false;
            }
            else {
              this.NonTerminateTable = true;
            }
            if(this.EmployeeVendorTerminated.length == 0){
              console.log(this.EmployeeVendorNotTerminated.length)
              this.TerminatedTable = false;
            }
            else {
              this.TerminatedTable = true;
            }
          }
        )

    }



buttonClicked(event){
 this.buttonclicked =  event.srcElement.name;

 switch(this.buttonclicked){
   case "Add": {

     console.log("Add button clicked");
      this.emp=new empvendor();
      this.displayDialog = true;
      this.EmployeeVendorNotTerminated.push(this.emp);
     break;
   }
 }
}

}
