/**
 * Created by venka on 12/24/2016.
 */
import {Injectable} from "@angular/core";
import {Headers, Response} from "@angular/http"
import 'rxjs/Rx'
import {HttpService} from "../../../../../globalservices/http.service";
import {Observable} from "rxjs";

@Injectable()
export class EmpVendorService{
  public  EmpVendorService : Observable<any> ;
 public  SelectedEmpId : String;
  constructor(private http : HttpService){}
  // getEmpVendorrelationData is to get the emp vendor data
  getEmpVendorRelationData(empId){
  console.log("The employee selected is"+empId);
  const body = {empId:empId};
  const header = new Headers({'Content-Type':'application/json'});
  return this.http.post("http://localhost:8080/empvenclientrel/getvenbyemp",body,{headers:header})
    .map(
      (res : Response) =>{
        return res.json();
      }
    );
  }
}
