import {Component, Output} from '@angular/core';
import {StaffService} from "../userservices/staff.service";
import {Response} from "@angular/http";
import {error} from "util";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {HeaderComponent} from "../../staffHome/header/header.component";


@Component({
  selector   : 'app-login',
  templateUrl: './login.component.html',
  styleUrls  : ['./login.component.css'],

})
export class LoginComponent {
  public loggedUserInLoginForm: string = "chandu";

  private staffLogin = {
    'emailAddress': '',
    'password'    : ''
  };

  getDetailsByLogin = {
    userRole: 'hr',
    firstName: '',
    lastName : ''
  };

  private currentStaffEmailAddress;
  staffLogged: boolean = false;
  error: String = '';


  constructor(private staffLoginService: StaffService, private router: Router, private toast: ToastsManager) {
    this.currentStaffEmailAddress = localStorage.getItem("currentStaffEmailAddress");
  }


  login() {
    this.staffLoginService.sendLoginCredentials(this.staffLogin).subscribe(
      data => {
        if (data != null) {

          console.log(data.token);
          console.log(window.location.origin);
          localStorage.setItem("user",data.role.toUpperCase()+":  "+data.fullName);
          localStorage.setItem("token", data.token);

          this.staffLoginService.sendToken(data).subscribe(
            res => {
              this.currentStaffEmailAddress = this.staffLogin.emailAddress;
              localStorage.setItem("currentStaffEmailAddress", this.currentStaffEmailAddress);
              this.staffLogin.emailAddress = '';
              this.staffLogin.password = '';
              // location.reload();
            }
          );

          this.router.navigate(['/home']);
          /*this.router.navigate(['/employees']);*/
        }
        else {
          console.log("error....");
          // return this.error = "Oops!  login credentials are wrong";
          this.toast.error('Sorry Wrong Credentials.. try again', 'Oops!!');
        }

      }
    );
  }


  clear() {
    this.staffLogin.emailAddress = '';
    this.staffLogin.password = '';
  }


}
