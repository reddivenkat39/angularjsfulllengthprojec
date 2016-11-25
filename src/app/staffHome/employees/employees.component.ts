import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  private allEmployee = false;
  private allActive =false;
  private allInActive = false;
  constructor() { }

  ngOnInit() {
  }
  onAllEmployeeClicked(){
    this.allEmployee=!this.allEmployee;
  }
  onAllActiveClicked(){
    this.allActive=!this.allActive;
  }
  onAlLInActiveClicked(){
    this.allInActive=!this.allInActive;
  }

}
