/**
 * Created by bapirazz naidu on 11/8/2016.
 */
import { RouterModule,Routes} from "@angular/router";

import {LoginComponent} from "./staff/login/login.component";
import {HeaderComponent} from "./staffHome/header/header.component";
import {HomeComponent} from "./staffHome/home/home.component";
import {CandidatesComponent} from "./staffHome/candidates/candidates.component";
import {ScreeningComponent} from "./staffHome/candidates/screening.component";
import {LoginGuard} from "./services/login.guard";
import {ForgetpasswordComponent} from "./staff/forgetpassword/forgetpassword.component";
import {AddstaffComponent} from "./staff/addstaff/addstaff.component";
import {ResetpasswordComponent} from "./staff/forgetpassword/resetpassword.component";
import {AddnewcandidateComponent} from "./staffHome/candidates/addnewcandidate/addnewcandidate.component";
import {AllCandidatesComponent} from "./staffHome/candidates/all-candidates/all-candidates.component";
import {DetailsByIdComponent} from "./staffHome/candidates/all-candidates/details-by-id/details-by-id.component";
const APP_ROUTES: Routes = [
  { path: '', component: LoginComponent },
  {path:'forgotpassword', component:ForgetpasswordComponent},// used in login component
  {path:'resetpassword/:token', component:ResetpasswordComponent},
  {path:'home', component: HomeComponent, canActivate: [LoginGuard]}, //given in
  {path:'candidates', component: CandidatesComponent, canActivate: [LoginGuard],
   children:[
     {path:'',component:AllCandidatesComponent,canActivate:[LoginGuard]},
     {path:'screening', component: ScreeningComponent, canActivate: [LoginGuard]}, //called in candidates tab
     {path:'addnewcandidate', component: AddnewcandidateComponent, canActivate: [LoginGuard]},
            ]
  }, //called in header component
  {path: 'details/:id', component: DetailsByIdComponent},  // called in all candidates component
  {path:'addstaff', component: AddstaffComponent, canActivate: [LoginGuard]},
  { path: '**', redirectTo: '' }


];


export const routing =RouterModule.forRoot(APP_ROUTES) ;
