import { Component } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {StaffService} from "../staffservices/staff.service";

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent  {
  myForm: FormGroup;
  private mailsent = true;



  constructor(private formBuilder: FormBuilder, private staffService: StaffService) {
    this.myForm= formBuilder.group({
      'forgotPasswordData':formBuilder.group({
        'emailAddress':['']
      })

    })
  }

  onSubmit(){
console.log(this.myForm.value.forgotPasswordData);
this.staffService.onForgotPasswordSubmit(this.myForm.value.forgotPasswordData).subscribe(
  res=> {
    if(res.datares!=null){
      console.log(res.datares);


    }else if (res.successres!=null){
      console.log(res.successres);
      this.mailsent=!this.mailsent;
    }else{
      console.log(res.errorres);
    }
  }
);
  }


}
