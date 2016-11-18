import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";

@Injectable()
export class CandidatesService {

  constructor(private http: Http) {
  }

  sendScreeningDetails(myForm) {
    console.log("send Screening details : screening ", myForm);
    const bodySend = JSON.stringify(myForm);
    console.log("myForm body ...........", bodySend)
    const headersSend = new Headers({'Content-Type': 'application/json'});
    return this.http.post("http://localhost:8080:8080/savescreening", bodySend, {headers: headersSend}).map((res: Response)=> {
        console.log("send screening deails", res);
        console.log("only key value pairs", res);
        return res.json()
      }
    );
  }

}
