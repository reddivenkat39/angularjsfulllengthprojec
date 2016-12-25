import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {HttpService} from "../../globalservices/http.service";

@Injectable()
export class CandidatesService {

  constructor(private http: HttpService) {
  }

  sendScreeningDetails(myForm) {
    console.log("send Screening details : screening ", myForm);
    const bodySend = JSON.stringify(myForm);
    console.log("myForm body ...........", bodySend);
    const headersSend = new Headers({'Content-Type': 'application/json'});
    return this.http.post("/tep/screening/save", bodySend, {headers: headersSend}).map((res: Response)=> {
        console.log("send screening deails", res);
        console.log("only key value pairs", res);
        return res.json()
      }
    );
  }

  sendCandidDtls(addNewCandiddtls){
    console.log("candid details", addNewCandiddtls);
    const bodySend = JSON.stringify(addNewCandiddtls);
    console.log("myForm body ...........", bodySend);
    const headersSend = new Headers({'Content-Type': 'application/json'});
    return this.http.post("/tep/candidate/savecandiddtls", bodySend, {headers: headersSend}).map((res: Response)=> {
        console.log("send candid deails", res);
        console.log("only key value pairs", res);
        return res.json()
      }
    );
  }

  getScreenedCandids(){ //get screened candidates and selected candidates from the one get url itself
    console.log("get screenedcandidates invoked");
    const headersSend = new Headers({'Content-Type':'application/json'});
    return this.http.get("/tep/screening/allscreencands",{headers: headersSend}).map(
      (res:Response)=> {
return res.json();
      }
    );
  }

  getCandidateDetails(){
    console.log("get candidates invoked");
    const headersSend = new Headers({'Content-Type':'application/json'});
    return this.http.get("/tep/screening/allscreencands",{headers: headersSend}).map(
      (res:Response)=> {
        return res.json().candDlts;
      }
    );
  }

  getScreenedCandidateDetailsById(candId){
    const headersSend = new Headers({'Content-Type':'application/json'});
    const candBody = {candId : candId };
    console.log("candId in bodySend",candBody);
    console.log("candId in headersSend",headersSend);
    return this.http.post("/tep/screening/byid",candBody,{headers: headersSend}).map(
      (res:Response)=> {
        console.log("res.json from getscreenedcanddetails By id",res.json());
        return res.json();
      }
    );
  }

}
