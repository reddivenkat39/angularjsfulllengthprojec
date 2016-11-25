import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CandidatesService} from "../candidates.service";
import {ScreenedCandidate} from "./ScreenedCandidate";


@Component({
  selector: 'app-all-candidates',
  templateUrl: './all-candidates.component.html',
  styleUrls: ['./all-candidates.component.css'],
  encapsulation:ViewEncapsulation.None,
})
export class AllCandidatesComponent implements OnInit {

  screenCandids: ScreenedCandidate[];
  screencandId = '';
  selectedCandidate: ScreenedCandidate;
  // screenedCandidate: ScreenedCandidate = new ScreenedCandImpl();


  constructor(private candidateService: CandidatesService) {
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
  }

}
