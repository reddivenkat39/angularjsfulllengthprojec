import {Component, OnInit} from '@angular/core';
import {StaffService} from "../../staff/staffservices/staff.service";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit{
  private loggedUserEmailAddress={
    'emailAddress':''
  };
  constructor(private staffService:StaffService){

  }
  ngOnInit(){
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
