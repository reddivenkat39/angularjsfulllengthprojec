import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.css']
})
export class TabContentComponent implements OnInit {
private employeesButtonClicked = false;
  constructor(private router: Router) { }

  ngOnInit() {
    // this.employeesButtonClicked=!this.employeesButtonClicked;
  }

  onEmployeeClick(){
    // this.router.navigateByUrl('/employees');
  }



}
