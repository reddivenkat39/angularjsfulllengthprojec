import { Component, OnInit } from '@angular/core';
import {ScreenedCandidate} from "../ScreenedCandidate";
import {CandidatesService} from "../../candidates.service";

@Component({
  selector: 'app-details-by-id',
  templateUrl: './details-by-id.component.html',
  styleUrls: ['./details-by-id.component.css']
})
export class DetailsByIdComponent implements OnInit {
 candId='';
  screenCand: ScreenedCandidate;
  constructor(private candidateService:CandidatesService) { }

  ngOnInit() {
    // this.candId=this.screenCand.candId;
    // console.log("candid id", this.candId);
    // this.candidateService.getScreenedCandidateDetailsById(this.candId).subscribe(
    //   res => {
    //     if (res.datares != null) {
    //       console.log("datares", res.datares);
    //     } else if (res.errorres != null) {
    //       console.log("errorres", res.errorres);
    //     } else if (res.successres != null) {
    //       console.log("successres", res.successres);
    //     } else {
    //       console.log("server problem");
    //     }
    //
    //   }
    // );
  }



}
