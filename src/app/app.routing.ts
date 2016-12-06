/**
 * Created by bapirazz naidu on 11/8/2016.
 */
import { RouterModule,Routes} from "@angular/router";
import {LoginComponent} from "./users/login/login.component";
import {HeaderComponent} from "./staffHome/header/header.component";
import {HomeComponent} from "./staffHome/home/home.component";
import {CandidatesComponent} from "./staffHome/candidates/candidates.component";
import {ScreeningComponent} from "./staffHome/candidates/screening.component";
import {LoginGuard} from "./globalservices/login.guard";
import {ForgetpasswordComponent} from "./users/forgetpassword/forgetpassword.component";
import {AddstaffComponent} from "./users/createloginaccount/addstaff/addstaff.component";
import {ResetpasswordComponent} from "./users/forgetpassword/resetpassword.component";
import {AddnewcandidateComponent} from "./staffHome/candidates/addnewcandidate/addnewcandidate.component";
import {AllCandidatesComponent} from "./staffHome/candidates/all-candidates/all-candidates.component";
import {DetailsByIdComponent} from "./staffHome/candidates/all-candidates/details-by-id/details-by-id.component";
import {SelectRowCandidatesComponent} from "./staffHome/candidates/select-row-candidates/select-row-candidates.component";
import {EmployeesComponent} from "./staffHome/employees/Allemployeesdetails/employees.component";
import {VendorsComponent} from "./staffHome/vendors/allvendordetails/vendors.component";
const APP_ROUTES: Routes = [
  { path: '', component: LoginComponent },
  {path:'forgotpassword', component:ForgetpasswordComponent},// used in login component
  {path:'resetpassword/:token', component:ResetpasswordComponent},
  {path:'home', component: HomeComponent}, //given in
  {path:'employees', component:EmployeesComponent},
  {path:'vendors', component:VendorsComponent},
  {path:'candidates', component: CandidatesComponent, canActivate: [LoginGuard],
   children:[
     {path:'',component:AllCandidatesComponent,canActivate:[LoginGuard]},
     {path:'screening', component: ScreeningComponent, canActivate: [LoginGuard]}, //called in candidates tab

       // called in all candidates component
            ]
  }, //called in header component
  {path: 'detailsbyid/:id', component: DetailsByIdComponent, canActivate: [LoginGuard]},
  {path:'addnewcandidate/:id', component: AddnewcandidateComponent, canActivate: [LoginGuard]},
  {path: 'selectedcandidate', component: SelectRowCandidatesComponent, canActivate: [LoginGuard]},
  {path:'addstaff', component: AddstaffComponent, canActivate: [LoginGuard]},
  { path: '**', redirectTo: '' }


];


export const routing =RouterModule.forRoot(APP_ROUTES) ;
