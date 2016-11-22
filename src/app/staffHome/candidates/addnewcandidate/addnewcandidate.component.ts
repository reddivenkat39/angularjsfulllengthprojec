import { Component} from '@angular/core';
import {CandidatesService} from "../candidates.service";

@Component({
  selector: 'app-addnewcandidate',
  templateUrl: './addnewcandidate.component.html',
  styleUrls: ['./addnewcandidate.component.css']
})
export class AddnewcandidateComponent  {
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
  constructor(private candidateService: CandidatesService) {

  }

  onSubmit(){
  this.candidateService.sendScreeningDetails(this.addNewCandidateScreening).subscribe(
    res=>{
      if(res.successres!=null){
        console.log("data saved succesfully",res.successres);
      }else if(res.datares!=null){
        console.log("datares invoked",res.datares);
      }else if(res.errorres!=null){
        console.log("Data not saved",res.errorres);
      }else{
        console.log("server failed");
      }
    }
  );
  this.candidateService.sendCandidDtls(this.addNewCandidate).subscribe(
    res=>{
      if(res.successres!=null){
        console.log("data saved succesfully",res.successres);
      }else if(res.datares!=null){
        console.log("datares invoked",res.datares);
      }else if(res.errorres!=null){
        console.log("Data not saved",res.errorres);
      }else{
        console.log("server failed");
      }
    }
  );


  }
}
