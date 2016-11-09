import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";


@Injectable()
export class LoginService {

  constructor(private http:Http) { }

  sendLoginForm(staffLogin){
    let loginUrl = "http://localhost:8080/login";
    let postHeader = new Headers({'Content-Type':'application/json'});
    return this.http.post(loginUrl,JSON.stringify(staffLogin),{headers:postHeader});
  }
}
