import { Component, OnInit } from '@angular/core';
import {CandidatesService} from "../candidates.service";
import {Employee} from "./employee";


@Component({
  selector: 'app-all-candidates',
  templateUrl: './all-candidates.component.html',
  styleUrls: ['./all-candidates.component.css']
})
export class AllCandidatesComponent implements OnInit {

  employees:Employee[];
  selectedEmployee: Employee;

  constructor(private candidateService: CandidatesService) {
  }

  ngOnInit() {
    this.candidateService.getScreenedCandids().subscribe(
      employees => {
        this.employees = employees;
      }
    );
  }
}
