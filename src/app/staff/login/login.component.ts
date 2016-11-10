import {Component} from '@angular/core';
import {StaffService} from "../staffservices/staff.service";
import {Response} from "@angular/http";
import {error} from "util";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private staffLogin = {
    'emailAddress': 'chandu',
    'password': 'bapiraju '
  };

  private currentStaffEmailAddress;
  staffLogged: boolean = false;

  constructor(private staffLoginService: StaffService) {
    this.currentStaffEmailAddress = localStorage.getItem("currentStaffEmailAddress");
  }


  login() {
    this.staffLoginService.sendLoginCredentials(this.staffLogin).subscribe(
      data=> {
        debugger;
        console.log(data);

        localStorage.setItem("token", data);
        this.staffLoginService.sendToken("token").subscribe(
          res=> {

            this.currentStaffEmailAddress = this.staffLogin.emailAddress;
            localStorage.setItem("currentStaffEmailAddress", this.currentStaffEmailAddress);
            this.staffLogin.emailAddress = '';
            this.staffLogin.password = '';
          },
          error=>console.log(error)
        );
      },

    );
  }



  clear() {
    this.staffLogin.emailAddress = '';
    this.staffLogin.password = '';
  }


}
