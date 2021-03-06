///<reference path="staffHome/employees/eachemployeedetails/EmpCRUDtabs/emp-work-auth-dtls/emp-work-auth-dtls-Main.ts"/>
///<reference path="staffHome/employees/eachemployeedetails/EmpCRUDtabs/emp-cont-dtls/emp-cont-dtls.component.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, XHRBackend, RequestOptions} from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './staffHome/header/header.component';


import { LoginComponent } from './users/login/login.component';
import { ForgetpasswordComponent } from './users/forgetpassword/forgetpassword.component';
import {StaffService} from "./users/userservices/staff.service";
import {routing} from "./app.routing";
import { LoginGuard } from "./globalservices/login.guard";
import { HomeComponent } from './staffHome/home/home.component';
import { CandidatesComponent } from './staffHome/candidates/candidates.component';
import { ScreeningComponent } from './staffHome/candidates/screening.component';
import {CandidatesService} from "./staffHome/candidates/candidates.service";
import { ResetpasswordComponent } from './users/forgetpassword/resetpassword.component';

import { AddstaffComponent } from './users/createloginaccount/addstaff/addstaff.component';
import {AddstaffService} from "./users/userservices/addstaff.service";
import {MaterialModule} from "@angular/material";
import { FileUploadComponent } from "./users/file-upload/file-upload.component";
import { AddnewcandidateComponent } from './staffHome/candidates/addnewcandidate/addnewcandidate.component';
import { DatatableComponent } from './staffHome/candidates/datatable/datatable.component';
import {DatatableService} from "./staffHome/candidates/datatable/datatable.service";
import { DataTableModule, DialogModule,FileUploadModule } from 'primeng/primeng';
import {SharedModule} from "primeng/components/common/shared";
import {ButtonModule} from "primeng/components/button/button";
import {PaginatorModule} from "primeng/components/paginator/paginator";
import { AllCandidatesComponent } from './staffHome/candidates/all-candidates/all-candidates.component';
import { EditDeleteDirective } from './globalservices/edit-delete.directive';
import { DetailsByIdComponent } from './staffHome/candidates/all-candidates/details-by-id/details-by-id.component';
import {SelectModule} from "angular2-select";
import { SelectRowCandidatesComponent } from './staffHome/candidates/select-row-candidates/select-row-candidates.component';
import { EmployeesComponent } from './staffHome/employees/Allemployeesdetails/employees.component';
import {EmployeeService} from "./staffHome/employees/employee.service";
import {ToastrModule} from "toastr-ng2";
import {ToastModule, ToastOptions} from "ng2-toastr";
import { TabContentComponent } from './staffHome/tab-content/tab-content.component';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { VendorsComponent } from './staffHome/vendors/allvendordetails/vendors.component';
import {VendorsService} from "./staffHome/vendors/vendors.service";
import {TabViewModule} from "primeng/components/tabview/tabview";
import {HttpService} from "./globalservices/http.service";
import { RoleRestrictDirective } from './globalservices/role-restrict.directive';
import {RoleAccessService} from "./globalservices/role-access.service";
import { ProjectsComponent } from './staffHome/projects/projects.component';
import {ProjectService} from "./staffHome/projects/project.service";
import { InvoicesComponent } from './staffHome/invoices/invoices.component';
import {InvoiceService} from "./staffHome/invoices/invoice.service";
import {RadioButtonModule} from "primeng/components/radiobutton/radiobutton";
import { EachemployeedetailsComponent } from './staffHome/employees/eachemployeedetails/eachemployeedetails.component';
import { EmpBreadCrumbsComponent } from './staffHome/employees/employeeNavigationTabs/emp-bread-crumbs.component';
import { EmpDetailedViewComponent } from './staffHome/employees/emp-detailed-view/emp-detailed-view.component';
import { EmpStatusTabsComponent } from './staffHome/employees/employeeStatusTabs/emp-status-tabs.component';
import { EmpEduDtlsComponent } from './staffHome/employees/eachemployeedetails/EmpCRUDtabs/emp-edu-dtls/emp-edu-dtls.component';

import { EmpContDtlsComponent } from './staffHome/employees/eachemployeedetails/EmpCRUDtabs/emp-cont-dtls/emp-cont-dtls.component';
import {EmpCrudTabsService} from "./staffHome/employees/emp-crud-tabs.service";
import { EmpAddrDtlsComponent } from './staffHome/employees/eachemployeedetails/EmpCRUDtabs/emp-addr-dtls/emp-addr-dtls.component';
import { EmpBenefitsComponent } from './staffHome/employees/eachemployeedetails/EmpCRUDtabs/emp-benefits/emp-benefits.component';
import { EmpProjDtlsComponent } from './staffHome/employees/eachemployeedetails/EmpCRUDtabs/emp-proj-dtls/emp-proj-dtls.component';
import {CommonModule} from "@angular/common";
import { EmpPayRollComponent } from './staffHome/employees/eachemployeedetails/EmpCRUDtabs/emp-pay-roll/emp-pay-roll.component';
import {EmpworkAuthDtls} from "./staffHome/employees/eachemployeedetails/EmpCRUDtabs/emp-work-auth-dtls/emp-work-auth-dtls-Main";
import {EmpVenCrudComponent} from "./staffHome/employees/eachemployeedetails/EmpCRUDtabs/emp-vendor-dtls/emp-vendor-dtldCrudComponent";
import {EmpVendorDetailed} from "./staffHome/employees/eachemployeedetails/EmpCRUDtabs/emp-vendor-dtls/emp-vendor-dtls.component";
import {EmployeeWorkAuthorization} from "./staffHome/employees/eachemployeedetails/EmpCRUDtabs/emp-work-auth-dtls/emp-work-auth-dtls-service";
import {EmpVendorService} from "./staffHome/employees/eachemployeedetails/EmpCRUDtabs/emp-vendor-dtls/emp-vendor-dtld.service"
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
    TabContentComponent,
    VendorsComponent,
    RoleRestrictDirective,
    ProjectsComponent,
    InvoicesComponent,
    EachemployeedetailsComponent,
    EmpBreadCrumbsComponent,
    EmpStatusTabsComponent,
    EmpDetailedViewComponent,
    EmpEduDtlsComponent,
    EmpContDtlsComponent,
    EmpAddrDtlsComponent,
    EmpBenefitsComponent,
    EmpProjDtlsComponent,
    EmpPayRollComponent,
    EmpVendorDetailed,
    EmpVenCrudComponent,
    EmpworkAuthDtls
  ],
  imports: [
    ToastrModule,
    ToastModule.forRoot(options),
    BrowserModule,
    RadioButtonModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    DataTableModule,
    FileUploadModule,
    DialogModule,
    SharedModule,
    ButtonModule,
    PaginatorModule,
    SelectModule,
    TabsModule,
    TabViewModule,
    CommonModule
  ],

  providers: [StaffService,LoginGuard,CandidatesService, AddstaffService, DatatableService,EmployeeService, VendorsService,RoleAccessService, ProjectService,InvoiceService,
    EmpCrudTabsService,
    {
      provide: HttpService,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new HttpService(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    },
    EmpVendorService,
    EmployeeWorkAuthorization
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
