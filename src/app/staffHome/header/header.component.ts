import {Component, OnInit, Input} from '@angular/core';
import {StaffService} from "../../users/userservices/staff.service";
import {LoginComponent} from "../../users/login/login.component";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit{
  @Input() loggedUser: string;

  private loggedUserEmailAddress={
    'emailAddress':''
  };
  constructor(private staffService:StaffService, private loginComponent: LoginComponent){

  }
  ngOnInit(){
    console.log('loggedUser is ', this.loggedUser);
    console.log('user role is ', this.loginComponent.getDetailsByLogin.userRole);
    /*this.staffService.getUserName().subscribe(
      res=>{
        if (res.datares != null) {
          console.log(res.datares);
          this.loggedUserEmailAddress.emailAddress = res.datares;

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
    );*/
  }
  onLogout(){
    this.staffService.logout();
  }
}
