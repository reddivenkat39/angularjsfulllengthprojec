import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import {AddstaffService} from "../../userservices/addstaff.service";

@Component({
  selector: 'app-addstaff',
  templateUrl: 'addstaff.component.html',
  styleUrls: ['addstaff.component.css']
})
export class AddstaffComponent {
  myAddStaffForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private addStaffService:AddstaffService) {
    this.myAddStaffForm = formBuilder.group({
      'addStaffData': formBuilder.group({
        'emailAddress': ['',[
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]],
        'firstName': ['',Validators.required],
        'lastName': ['', Validators.required],
        'loginPassword': ['', Validators.required],
        'role':['', Validators.required]

      })
    });
  }
  onSubmit(){
    console.log("form for add users on submit");
    console.log(this.myAddStaffForm.value.addStaffData);
    this.addStaffService.sendAddStaffDetails(this.myAddStaffForm.value.addStaffData).subscribe(
      res=>{
        if(res.success!=null){
          console.log(res.success);
        }
        else if (res.data){
          console.log(res.data);
        }
        else {
          console.log(res.error);
        }
      }
    )
  }
}
