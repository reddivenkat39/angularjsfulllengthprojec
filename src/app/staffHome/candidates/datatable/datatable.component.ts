import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {DatatableService} from "./datatable.service";
import {Employee} from "./employee.interface";
@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
  encapsulation:ViewEncapsulation.None,
})
export class DatatableComponent implements OnInit {
  employees:Employee[];
  constructor(private datatableService:DatatableService) { }

  ngOnInit() {
    this.datatableService.getEmployeeDetails().then(employees=>this.employees=employees);
  }
}
