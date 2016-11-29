import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx';
import {Router} from "@angular/router";


@Injectable()
export class StaffService {


  constructor(private http: Http, private  router: Router) {
  }

  sendLoginCredentials(staffLogin) {
    console.log("sendLoginCredentials: staffLogin ", staffLogin);
    const bodySend = JSON.stringify(staffLogin);
    console.log("sendLoginCredentials: bodySend...... ", bodySend);
    const headersSend = new Headers({'Content-Type': 'application/json'});
    return this.http.post("http://10.10.5.55:8080/staff/login", bodySend, {headers: headersSend})
      .map((data: Response)=> {
        console.log("sendLoginCredentials: Response ", data);
        return data.json().datares;
        // return data['_body']
      });
  }

  sendToken(token) {
    let tokenUrl2 = "http://10.10.5.55:8080/staff/staffids";
    console.log('Bearer ' + token);
    const getHeaders = new Headers({'authorization': 'Bearer '+token});
    return this.http.get(tokenUrl2, {headers: getHeaders})
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

  logout() {
    this.router.navigate(['']);
    localStorage.removeItem("token");
    localStorage.removeItem("currentStaffEmailAddress");
  }


  onForgotPasswordSubmit(forgotPasswordData) {
    const bodySend = JSON.stringify(forgotPasswordData);
    const headersSend = new Headers({'Content-Type': 'application/json'});
    return this.http.post("http://10.10.5.55:8080/staff/forgotpassword", bodySend, {headers: headersSend})
      .map((data: Response)=> {
        console.log("sendLoginCredentials: Response ", data.json());
        return data.json();
        // return data['_body']
      });
  }

  findEmailAddressByToken(token){
     let tokenUrl2 = "http://10.10.5.55:8080/findemailidbytoken";
    console.log('Bearer ' + token);
    const getHeaders = new Headers({'authorization': 'Bearer '+token});
    return this.http.get(tokenUrl2, {headers: getHeaders}).map(
      (res: Response)=>{
        console.log("emailAddress by Token for reset password", res.json() );
        return res.json();

      }
    );

  }

  sendResetPasswordCredentials(forgotPasswordCredentials){
    const bodySend = JSON.stringify(forgotPasswordCredentials);
    console.log(forgotPasswordCredentials);
    const headersSend = new Headers({'Content-Type': 'application/json'});
    return this.http.post("http://10.10.5.55:8080/staff/resetpassword", bodySend, {headers: headersSend})
      .map((data: Response)=> {
        console.log("sendLoginCredentials: Response ", data.json());
        return data.json();
      });
  }
}





