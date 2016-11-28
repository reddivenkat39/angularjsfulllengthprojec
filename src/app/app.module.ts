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
import { DatatableComponent } from './staffHome/candidates/datatable/datatable.component';
import {DatatableService} from "./staffHome/candidates/datatable/datatable.service";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {SharedModule} from "primeng/components/common/shared";
import {ButtonModule} from "primeng/components/button/button";
import {TabViewModule} from "primeng/primeng";
import {PaginatorModule} from "primeng/components/paginator/paginator";
import { AllCandidatesComponent } from './staffHome/candidates/all-candidates/all-candidates.component';
import { EditDeleteDirective } from './services/edit-delete.directive';
import { DetailsByIdComponent } from './staffHome/candidates/all-candidates/details-by-id/details-by-id.component';
import {SelectModule} from "angular2-select";
import { SelectRowCandidatesComponent } from './staffHome/candidates/select-row-candidates/select-row-candidates.component';
import { EmployeesComponent } from './staffHome/employees/Allemployeesdetails/employees.component';
import {EmployeeService} from "./staffHome/employees/employee.service";
import {ToastrModule} from "toastr-ng2";
import {ToastModule, ToastOptions} from "ng2-toastr";
import { TabContentComponent } from './staffHome/tab-content/tab-content.component';

let options: ToastOptions = new ToastOptions({
  animate: 'fade',
  positionClass: 'toast-top-center',
});


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
    AddnewcandidateComponent,
    DatatableComponent,
    AllCandidatesComponent,
    EditDeleteDirective,
    DetailsByIdComponent,
    SelectRowCandidatesComponent,
    EmployeesComponent,
    TabContentComponent
  ],
  imports: [
    ToastrModule,
    ToastModule.forRoot(options),
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    DataTableModule,
    SharedModule,
    ButtonModule,
    PaginatorModule,
    SelectModule,
    TabViewModule
  ],

  providers: [StaffService, LoginGuard,CandidatesService, AddstaffService, DatatableService,EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
