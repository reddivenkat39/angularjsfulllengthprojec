import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CandidatesService} from "../candidates.service";
import {ScreenedCandidate} from "./ScreenedCandidate";
import {error} from "util";
import {Router} from "@angular/router";


@Component({
  selector     : 'app-all-candidates',
  templateUrl  : './all-candidates.component.html',
  styleUrls    : ['./all-candidates.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AllCandidatesComponent implements OnInit {

  screenCandids: ScreenedCandidate[];
  screencandId = '';
  candId = '';
  selectedCandidate: ScreenedCandidate;

  // screenedCandidate: ScreenedCandidate = new ScreenedCandImpl();


  constructor(private router: Router, private candidateService: CandidatesService) {
  }

  ngOnInit() {
    this.candidateService.getScreenedCandids().subscribe(
      screenCandids => {
        this.screenCandids = screenCandids;
        this.screencandId = screenCandids.candId;
        console.log("employeeId", this.screencandId);

      }
    );
  }

  onSelectRow(event) {
    // this.candidateService.getScreenedCandidateDetailsById(employees.candId).subscribe(
    //
    // );
    console.log("selected the row......", this.screencandId);
    this.router.navigateByUrl('/selectedcandidate');
    event.preventDefault();
  }


  onClickView(screenCand: ScreenedCandidate) {
    this.candId = screenCand.candId;
    console.log("candid id", this.candId);
    this.candidateService.getScreenedCandidateDetailsById(this.candId).subscribe(
      res => {
        if (res.datares != null) {
          console.log("datares", res.datares);
          this.router.navigateByUrl('/detailsbyid');
          // [routerLink]="['detailsbyid']"
        } else if (res.errorres != null) {
          console.log("errorres", res.errorres);
        } else if (res.successres != null) {
          console.log("successres", res.successres);
        } else {
          console.log("server problem");
        }

      }
    );
  }


}
