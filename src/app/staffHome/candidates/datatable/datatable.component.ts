import { Component, OnInit } from '@angular/core';
import {DatatableService} from "./datatable.service";
import {Employee} from "./employee.interface";
import {CandidatesService} from "../candidates.service";
@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  employees:Employee[];
  constructor( private candidateService: CandidatesService) { }

  ngOnInit() {
    this.candidateService.getScreenedCandids().subscribe(
      employees=>{
        this.employees=employees;
      }
    );

  }
}
