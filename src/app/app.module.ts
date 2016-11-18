import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './staffHome/header/header.component';


import { LoginComponent } from './staff/login/login.component';
import { ForgetpasswordComponent } from './staff/forgetpassword/forgetpassword.component';

import {StaffService} from "./staff/staffservices/staff.service";
import {routing} from "./app.routing";
import { LoginGuard } from "./services/login.guard";
import { HomeComponent } from './staffHome/home/home.component';
import { CandidatesComponent } from './staffHome/candidates/candidates.component';
import { ScreeningComponent } from './staffHome/candidates/screening.component';
import {CandidatesService} from "./staffHome/candidates/candidates.service";
import { ResetpasswordComponent } from './staff/forgetpassword/resetpassword.component';

import { AddstaffComponent } from './staff/addstaff/addstaff.component';
import {AddstaffService} from "./staff/staffservices/addstaff.service";
import {MaterialModule} from "@angular/material";
import { FileUploadComponent } from "./staff/file-upload/file-upload.component";
import { AddnewcandidateComponent } from './staffHome/candidates/addnewcandidate/addnewcandidate.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ForgetpasswordComponent,
    HomeComponent,
    CandidatesComponent,
    ScreeningComponent,
    AddstaffComponent,
    ScreeningComponent,
    ResetpasswordComponent,
    FileUploadComponent,
    AddnewcandidateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    MaterialModule.forRoot()
  ],
  providers: [StaffService, LoginGuard,CandidatesService, AddstaffService],
  bootstrap: [AppComponent]
})
export class AppModule { }
