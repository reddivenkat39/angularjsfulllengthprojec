import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './staffHome/header/header.component';


import { LoginComponent } from './staff/login/login.component';
import { ForgetpasswordComponent } from './staff/forgetpassword/forgetpassword.component';

import {StaffService} from "./staff/staffservices/staff.service";
import {routing} from "./app.routes";

import { HomeComponent } from './staffHome/home/home.component';
import { CandidatesComponent } from './staffHome/candidates/candidates.component';
import { ScreeningComponent } from './staffHome/candidates/screening.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ForgetpasswordComponent,
    HomeComponent,
    CandidatesComponent,
    ScreeningComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [StaffService],
  bootstrap: [AppComponent]
})
export class AppModule { }
