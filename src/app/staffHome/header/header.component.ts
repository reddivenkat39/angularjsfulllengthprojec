import {Component, OnInit, Input, Inject} from '@angular/core';
import {StaffService} from "../../users/userservices/staff.service";
import {LoginComponent} from "../../users/login/login.component";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit{
   loggedUser: string;

  private loggedUserEmailAddress={
    'emailAddress':''
  };
  constructor(private staffService:StaffService, private router: Router, private toast: ToastsManager, @Inject(StaffService) loginService: StaffService){

  }
  ngOnInit(){
    console.log('loggedUser is ', this.loggedUser);
    this.loggedUser =localStorage.getItem("user");
    // console.log('user role is ', this.loginComponent.getDetailsByLogin.userRole);
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
    this.staffService.logout().subscribe(
      res=>{
        if(res.successres!=null) {
          localStorage.removeItem("token");
          localStorage.removeItem("currentStaffEmailAddress");
          localStorage.removeItem("user");
          this.router.navigate(['']);
          this.toast.info('', res.successres);

        }
        else if(res.errorres!=null){


          localStorage.removeItem("token");
          localStorage.removeItem("currentStaffEmailAddress");
          localStorage.removeItem("user");
          this.router.navigate(['']);
          this.toast.error(res.errorres,'something went wrong...');
        }
        else {
          this.toast.error('server is not working','Oops!!');
          localStorage.removeItem("token");
          localStorage.removeItem("currentStaffEmailAddress");
          localStorage.removeItem("user");
          this.router.navigate(['']);

        }
      }
    );
  }
}
