import {Component} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
} from "@angular/forms";


import {CandidatesService} from "./candidates.service";


@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.css']
})
export class ScreeningComponent {
  myForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private candidateService: CandidatesService) {
    this.myForm = formBuilder.group({
      'candidateData': formBuilder.group({
        'candidateName': [''],
        'candidateReference': [''],
        'visaStatus': [''],
        'visaValidity': [''],
        'h1Window': [''],
        'currentEmployer': [''],
        'primarySill': [''],
        'skillSet': [''],
        'totalExperience': [''],
        'currentCompensation': [''],
        'expectedCompensation': [''],
        'agreedCompensation': [''],
        'costToCompany': [''],
        'currentLocation': [''],
        'relocation': [''],
        'noticePeriod': [''],
        'h1ReceiptNumber': [''],
        'communicationSkills': [''],
        'comments': ['']


      })
    });
  }

  onSubmit() {
    // event.preventDefault();
    console.log("form on submit");
    console.log(this.myForm.value.candidateData);
    this.candidateService.sendScreeningDetails(this.myForm.value).subscribe(
      data=> {
        console.log("success");
      }
      // success=>{
      //
      // },
      // error=>{
      //
      // }
    );
  }


}

