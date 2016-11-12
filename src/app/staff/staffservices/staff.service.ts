import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx';
import {Router} from "@angular/router";


@Injectable()
export class StaffService {




  constructor(private http: Http, private  router: Router) {
  }

  sendLoginCredentials(staffLogin) {
    console.log("sendLoginCredentials: staffLogin ",  staffLogin);
    const bodySend = JSON.stringify(staffLogin);
    const headersSend = new Headers({'Content-Type': 'application/json'});
    return this.http.post("http://10.10.5.55:8080/staff/login", bodySend, {headers: headersSend})
      .map((data: Response)=> {
        console.log("sendLoginCredentials: Response ",  data);
        return data.json().data
        // return data['_body']
      });
  }

  sendToken(token) {
    let tokenUrl2 = "http://10.10.5.55:8080/staff/staffids";
    console.log('Bearer ' + token);
    const headersSend = new Headers({'Content-Type': 'application/json'});
    return this.http.get(tokenUrl2, {headers: headersSend})
  }

  checkLogin() {
    if (localStorage.getItem("currentStaffEmailAddress") != null && localStorage.getItem("currentStaffEmailAddress") != '' && localStorage.getItem("token")) {
      console.log(localStorage.getItem("currentStaffEmailAddress"));
      console.log(localStorage.getItem("token"));
      return true;
    }
    else {
      return false;
    }
}

  logout(){
    this.router.navigate(['']);
    localStorage.removeItem("token");
    localStorage.removeItem("currentStaffEmailAddress");
  }
}









