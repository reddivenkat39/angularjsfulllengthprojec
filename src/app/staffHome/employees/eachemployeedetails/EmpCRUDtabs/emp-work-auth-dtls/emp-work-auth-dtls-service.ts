/**
 * Created by venka on 12/27/2016.
 */
import {Injectable} from "@angular/core"
import { Headers, Response} from "@angular/http"
import {HttpService} from "../../../../../globalservices/http.service";
@Injectable()
export class EmployeeWorkAuthorization{
constructor(private http : HttpService){}

getWorkAuthorizationDetailsFromServer(empId){
  const body = {empId: empId};
  const headers = new Headers({'Content-Type':'application/json'});
  return this.http.post("http://localhost:8080/workauth/byid",body,{headers:headers}).
    map(
    (res:Response)=>{
      return res.json()
    }
  )
}
}
