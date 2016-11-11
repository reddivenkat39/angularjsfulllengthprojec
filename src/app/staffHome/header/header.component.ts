import { Component } from '@angular/core';
import {StaffService} from "../../staff/staffservices/staff.service";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent{
  constructor(private staffService:StaffService){

  }
  onLogout(){
    this.staffService.logout();
  }

}
