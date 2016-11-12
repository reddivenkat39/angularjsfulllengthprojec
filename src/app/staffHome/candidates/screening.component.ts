import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
} from "@angular/forms";
import { Observable } from "rxjs/Rx";
@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.css']
})
export class ScreeningComponent {
  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
      'candidateData': formBuilder.group({
        'canName': [''],
        'canRef':[''],
        'visaSta':[''],
        'visaVal':[''],
        'h1Win':[''],
        'curEmplyr':[''],
        'primSkill':[''],
        'skillSet':[''],
        'totalExp':[''],
        'curComp':[''],
        'expComp':[''],
        'agrdComp':[''],
        'cstToCmpny':[''],
        'curLoc':[''],
        'relocation':[''],
        'notPrd':[''],
        'h1RcptNum':[''],
        'comSkills':[''],
        'comments':[''],
        'fileUpld':['']

      }),
    });
  }

  onSubmit() {
    console.log("form on submit");
    console.log(this.myForm);
  }

}

