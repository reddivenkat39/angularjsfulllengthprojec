import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";

@Injectable()
export class CandidatesService {

  constructor(private http: Http) {
  }

  sendScreeningDetails(myForm) {
    console.log("send Screening details : screening ", myForm);
    const bodySend = JSON.stringify(myForm);
    console.log("myForm body ...........", bodySend);
    const headersSend = new Headers({'Content-Type': 'application/json'});
    return this.http.post("http://10.10.5.55:8080/savescreening", bodySend, {headers: headersSend}).map((res: Response)=> {
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
    return this.http.post("http://10.10.5.55:8080/savecandiddtls", bodySend, {headers: headersSend}).map((res: Response)=> {
        console.log("send candid deails", res);
        console.log("only key value pairs", res);
        return res.json()
      }
    );
  }

  getScreenedCandids(){ //get screened candidates and selected candidates from the one get url itself
    console.log("get screenedcandidates invoked");
    const headersSend = new Headers({'Content-Type':'application/json'});
    return this.http.get("http://10.10.5.55:8080/getscreenedcands",{headers: headersSend}).map(
      (res:Response)=> {
return res.json();
      }
    );
  }

  getCandidateDetails(){
    console.log("get candidates invoked");
    const headersSend = new Headers({'Content-Type':'application/json'});
    return this.http.get("http://10.10.5.55:8080/getscreenedcands",{headers: headersSend}).map(
      (res:Response)=> {
        return res.json().candDlts;
      }
    );
  }

  getScreenedCandidateDetailsById(candId){
    const headersSend = new Headers({'Content-Type':'application/json'});
    return this.http.get("http://localhost:8080/screenedcandsbyid",{headers: headersSend}).map(
      (res:Response)=> {
        return res.json();
      }
    );
  }

}
