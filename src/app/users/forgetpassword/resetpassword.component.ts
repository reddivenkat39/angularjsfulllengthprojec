import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Http} from "@angular/http";
import {StaffService} from "../userservices/staff.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector   : 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls  : ['./resetpassword.component.css']
})

export class ResetpasswordComponent implements OnDestroy, OnInit {
  private subscription: Subscription;
  token: string;
  private resetpasswordClicked = true;
  private tokenExpired =false;
  private resetPassword = {
    'emailAddress'      : '',
    'newPassword'       : '',
    'confirmNewPassword': ''
  };


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private staffService: StaffService, private toastMsg: ToastsManager) {
    // this.emailAddressFromToken='';
    this.subscription = activatedRoute.queryParams.subscribe(
      queryParam => this.token = queryParam['token']
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    localStorage.setItem("token", this.token);
    this.staffService.findEmailAddressByToken(localStorage.getItem("token")).subscribe(
      res => {

        if (res.datares != null) {
          console.log(res.datares);
          this.tokenExpired = false;
          this.resetPassword.emailAddress = res.datares;

        }
        else if (res.successres != null) {
          console.log(res.successres);

        }
        else if (res.errorres != null) {
          console.log(res.errorres);
          this.tokenExpired = true;
          this.toastMsg.error('', res.errorres);
          this.router.navigate(['/']);
        } else {

          console.log("server problem");
        }
      }
    );

  }

  onSubmit() {
    this.resetpasswordClicked = !this.resetpasswordClicked;
    this.staffService.sendResetPasswordCredentials(this.resetPassword).subscribe(
      res => {
        if (res.errorres != null) {
          console.log(res.errorres);
        }
        else if (res.datares != null) {
          console.log(res.datares);
          localStorage.getItem("token");
          console.log(localStorage.getItem("token"));
          localStorage.removeItem("token");
          console.log(localStorage.getItem("token"));
          localStorage.setItem("token", res.datares);
          this.router.navigate(['/home']);
        }
        else if (res.successres != null) {
          console.log(res.successres);
        }
        else {
          console.log("server problem");
        }
      }
    );
  }


}
