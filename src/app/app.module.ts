import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';


import { LoginComponent } from './staff/login/login.component';
import { ForgetpasswordComponent } from './staff/forgetpassword/forgetpassword.component';

import {StaffService} from "./staff/staffservices/staff.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ForgetpasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [StaffService],
  bootstrap: [AppComponent]
})
export class AppModule { }
