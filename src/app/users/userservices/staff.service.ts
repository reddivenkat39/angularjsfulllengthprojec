import {Injectable} from '@angular/core';
import { Headers, Response} from "@angular/http";
import 'rxjs/Rx';
import {Router} from "@angular/router";
import {HttpService} from "../../globalservices/http.service";


@Injectable()
export class StaffService {


  constructor(private http: HttpService, private  router: Router) {
  }

  sendLoginCredentials(staffLogin) {
    console.log("sendLoginCredentials: staffLogin ", staffLogin);
    const bodySend = JSON.stringify(staffLogin);
    console.log("sendLoginCredentials: bodySend...... ", bodySend);
    const headersSend = new Headers({'Content-Type': 'application/json'});
    return this.http.post("/tep/authorize/login", bodySend, {headers: headersSend})
      .map((data: Response)=> {
        console.log("sendLoginCredentials: Response ", data);
        return data.json().datares;
        // return data['_body']
      });
  }

  sendToken(token) {
    let tokenUrl2 = "/tep/authorize/staffids";
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
    const headersSend = new Headers({'Content-Type': 'application/json'});
    return this.http.post("/tep/authorize/logout", {headers: headersSend})
      .map((data: Response)=> {
        console.log("sendLoginCredentials: Response ", data.json());
        return data.json();
        // return data['_body']
      });
  }


  onForgotPasswordSubmit(forgotPasswordData) {
    const bodySend = JSON.stringify(forgotPasswordData);
    const headersSend = new Headers({'Content-Type': 'application/json'});
    return this.http.post("/tep/authorize/forgotpassword", bodySend, {headers: headersSend})
      .map((data: Response)=> {
        console.log("sendLoginCredentials: Response ", data.json());
        return data.json();
        // return data['_body']
      });
  }

  findEmailAddressByToken(token){
     let tokenUrl2 = "/tep/findemailidbytoken";
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
    return this.http.post("/tep/authorize/resetpassword", bodySend, {headers: headersSend})
      .map((data: Response)=> {
        console.log("sendLoginCredentials: Response ", data.json());
        return data.json();
      });
  }


  getUserName(){
    console.log("get logged in user name");
    const headersSend = new Headers({'Content-Type':'application/json'});
    return this.http.get("/tep/authorize/login",{headers: headersSend}).map(
      (res:Response)=> {
        console.log("getting each employee details",res.json());
        return res.json();
      }
    );
  }
}





