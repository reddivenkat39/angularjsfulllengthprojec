import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-addnewcandidate',
  templateUrl: './addnewcandidate.component.html',
  styleUrls: ['./addnewcandidate.component.css']
})
export class AddnewcandidateComponent implements OnInit {
  private addnewcandidate = {
    'firstName'      : '',
    'lastName'       : '',
    'emailID': '',
    'phNo':'',
    'source':'',
    'visaStatus':'',
    'expInYrs':'',
    'TotalExpInMnths':'',
    'primarySkill':'',
    'currentJobTitle':'',
    'currentEmplyr':'',
    'skillSet':'',
    'expectedSalry':'',
    'highestQualiHeld':'',
    'additionalInfo':'',
    'currentSalary':'',
    'candidateStatus':'',
    'note':''
  };
  constructor() { }

  ngOnInit() {
  }

}
