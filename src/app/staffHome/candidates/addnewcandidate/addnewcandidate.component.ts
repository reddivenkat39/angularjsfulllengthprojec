import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-addnewcandidate',
  templateUrl: './addnewcandidate.component.html',
  styleUrls: ['./addnewcandidate.component.css']
})
export class AddnewcandidateComponent implements OnInit {
  private addNewCandidate = {
    'candId':'',
    'emailId': '',
    'phNo':'',
    'source':'',
    'expInYears':'',
    'currentJobTitle':'',
    'techSkillSets':'',
    'expectedSal':'',
    'highestQualiHeld':'',
    'additionalInfo':'',
    'currentSal':'',
    'candidateStatus':'',
    'note':''
  };
  private addNewCandidateScreening ={
    'firstName'      : '',
    'lastName'       : '',
    'visaStatus':'',
    'primSkill':'',
    'curEmplyr':'',
  };
  constructor() { }

  ngOnInit() {
  }

}
