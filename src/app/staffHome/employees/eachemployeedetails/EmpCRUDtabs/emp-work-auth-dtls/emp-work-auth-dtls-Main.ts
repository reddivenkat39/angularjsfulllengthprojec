/**
 * Created by venka on 12/26/2016.
 */
import {Component, Input, OnInit} from "@angular/core"
import {EmployeeWorkAuthorization} from "./emp-work-auth-dtls-service"
import {PassPortClass} from "./PaspportModel"
@Component({
  selector: "emp-work-auth-dtls",
  templateUrl: './emp-work-auth-dtls-Main.html'
})
export class EmpworkAuthDtls implements  OnInit{
  constructor(private employeeworkauthorization:EmployeeWorkAuthorization){}
  employeeWorkAuthorizationDetails={};
  passportdetails ={};
  LcaDetails = {};
  I94Details = {};
  ImmigrationDetails : any[] = [];
@Input() empId: String = '';
ngOnInit(){
this.LoadDataInWorkAuthorization();
  console.log(this.passportdetails)
}


LoadDataInWorkAuthorization()
  {
    this.employeeworkauthorization.getWorkAuthorizationDetailsFromServer(this.empId).subscribe(
      data => {
        console.log(this.empId)
        console.log(data.datares.length);
        var x = 0;
        var y =data.datares.length
        while(x<y){
          this.ImmigrationDetails[x] = this.ImmigrationObject(data.datares[x]);
                  x++;
        }
              this.employeeWorkAuthorizationDetails = data.datares[0];

              this.passportdetails = this.passportObject(this.employeeWorkAuthorizationDetails);
              this.LcaDetails = this.LcaObject(this.employeeWorkAuthorizationDetails);
               this.I94Details = this.I94Object(this.employeeWorkAuthorizationDetails);
      });
  }

passportObject(workauthdetails){
  return {"passportNum":workauthdetails.passportNum,
  "passportStrtDt":workauthdetails.passportStrtDt,
  "passportEndDt":workauthdetails.passportEndDt};
}

LcaObject(workauthdetails){
  return {
    "loc1AddrLine1": workauthdetails.loc1AddrLine1,
      "loc1AddrLine2": workauthdetails.loc1AddrLine2,
    "loc1City": workauthdetails.loc1City,
    "loc1State": workauthdetails.loc1State,
    "loc1Zip": workauthdetails.loc1Zip,
    "loc2City": workauthdetails.loc2City,
    "loc2State": workauthdetails.loc2State,
    "endDt":workauthdetails.endDt,
    "startDt": workauthdetails.startDt,
    "lcaCertfdDt": workauthdetails.lcaCertfdDt,
    "loc2Zip": workauthdetails.loc2Zip,
    "loc2AddrLine1": workauthdetails.loc2AddrLine1,
    "loc2AddrLine2": workauthdetails.loc2AddrLine2,
    "lcaWages": workauthdetails.lcaWages,
    "lcaDesg": workauthdetails.lcaDesg,
    "clientNum":workauthdetails.clientNum,
    "lcaNum": workauthdetails.lcaNum
  }
}

I94Object(workauthdetails){
  return {
    "i94Num":workauthdetails.i94Num,
    "i94StrtDt":workauthdetails.i94StrtDt,
    "i94EndDt": workauthdetails.i94EndDt,
    "visaType": workauthdetails.visaType,
    "visaValidityDt": workauthdetails.visaValidityDt
  }

}
  ImmigrationObject(workauthdetails){
   return { "docName": workauthdetails.docName,
      "docType": workauthdetails.docType,
      "docProcTyp": workauthdetails.docProcTyp,
      "docReceiptDt": workauthdetails.docReceiptDt,
      "docReceiptNum": workauthdetails.docReceiptNum,
      "docStatus": workauthdetails.docStatus,
      "docStrtDt": workauthdetails.docStrtD,
      "docEndDt":   workauthdetails.docEndDt}

  }
}
