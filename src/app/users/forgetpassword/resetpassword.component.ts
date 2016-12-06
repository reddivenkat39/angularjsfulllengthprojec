import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Http} from "@angular/http";
import {StaffService} from "../userservices/staff.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector   : 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls  : ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnDestroy, OnInit {
  private subscription: Subscription;
  token: string;
  private resetpasswordClicked=true;
  private resetPassword = {
    'emailAddress'      : '',
    'newPassword'       : '',
    'confirmNewPassword': ''
  };


  constructor(private router:Router, private activatedRoute: ActivatedRoute, private staffService: StaffService) {
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
          this.resetPassword.emailAddress = res.datares;

        }
        else if (res.successres != null) {
          console.log(res.successres);
        }
        else if (res.errorres != null) {
          console.log(res.errorres);
        } else {
          console.log("server problem");
        }
      }
    );

  }

  onSubmit(){
    this.resetpasswordClicked=!this.resetpasswordClicked;
    this.staffService.sendResetPasswordCredentials(this.resetPassword).subscribe(
      res => {

        if (res.successres != null) {

          console.log(res.successres);
          this.router.navigate(['/home']);
        }
        else if (res.errorres != null) {
          console.log(res.errorres);
        }
        else if (res.datares != null) {
          console.log(res.datares);
        }
        else {
          console.log("server problem");
        }
      }
    );
  }


}
