import {Component, OnInit} from '@angular/core';
import {CandidatesService} from "../candidates.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-addnewcandidate',
  templateUrl: './addnewcandidate.component.html',
  styleUrls: ['./addnewcandidate.component.css']
})
export class AddnewcandidateComponent implements OnInit{
  candId='';
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
  constructor(private candidateService: CandidatesService, private activatedRoute: ActivatedRoute) {
 this.candId=activatedRoute.snapshot.params['id'];
  }

  ngOnInit(){
    console.log("candid id", this.candId);
    this.candidateService.getScreenedCandidateDetailsById(this.candId).subscribe(
      res => {
        if (res.datares != null) {
          console.log("datares", res.datares);
          this.addNewCandidateScreening = res.datares;
          this.addNewCandidate = res.datares;
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
