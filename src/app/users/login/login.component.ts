import { Component } from '@angular/core';
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
private staffLogin = {
  'username':'',
  'password':''
};

private currentUserName;

  constructor(private loginService:LoginService) { }

  login(){
    this.loginService.sendLoginForm(this.staffLogin).subscribe(
      data => {

      }
    );
  }

  clear(){

  };

}
