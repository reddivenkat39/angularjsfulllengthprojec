import {Component, OnInit} from '@angular/core';
import {ScreenedCandidate} from "../ScreenedCandidate";
import {CandidatesService} from "../../candidates.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector   : 'app-details-by-id',
  templateUrl: './details-by-id.component.html',
  styleUrls  : ['./details-by-id.component.css']
})
export class DetailsByIdComponent implements OnInit {
  candId = '';
  editClicked = false;
  // screenCand: ScreenedCandidate;
  private screeningDetails = {
    'firstName'  : '',
    'lastName'   : '',
    'canRef'     : '',
    'visaSta'    : '',
    'visaVal'    : '',
    'valNtAplcbl': '',
    'h1Win'      : '',
    'curEmplyr'  : '',
    'primSkill'  : '',
    'skillSet'   : '',
    'totalExp'   : '',
    'curComp'    : '',
    'expComp'    : '',
    'agrdComp'   : '',
    'cstToCmpny' : '',
    'curLoc'     : '',
    'relocation' : '',
    'notPrd'     : '',
    'h1RcptNum'  : '',
    'comSkills'  : '',
    'comments'   : '',
    'slctnSta'   : '',
  };

  constructor(private candidateService: CandidatesService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.candId = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    // this.candId=this.screenCand.candId;
    console.log("candid id", this.candId);
    this.candidateService.getScreenedCandidateDetailsById(this.candId).subscribe(
      res => {
        if (res.datares != null) {
          console.log("datares", res.datares);
          this.screeningDetails = res.datares;
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

  onClickCreateCandidate(){
    console.log("candid id", this.candId);
    this.router.navigateByUrl('/addnewcandidate/'+this.candId);

  }


}
