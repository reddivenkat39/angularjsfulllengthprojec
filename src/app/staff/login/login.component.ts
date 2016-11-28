import {Component} from '@angular/core';
import {StaffService} from "../staffservices/staff.service";
import {Response} from "@angular/http";
import {error} from "util";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";


@Component({
  selector   : 'app-login',
  templateUrl: './login.component.html',
  styleUrls  : ['./login.component.css']
})
export class LoginComponent {
  private staffLogin = {
    'emailAddress': 'chandu.adabala@tabnergc.com',
    'password'    : 'asdf'
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

          console.log(data);
          console.log(window.location.origin);

          localStorage.setItem("token", data);

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
