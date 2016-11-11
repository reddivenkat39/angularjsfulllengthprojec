/**
 * Created by bapirazz naidu on 11/8/2016.
 */
import { RouterModule,Routes} from "@angular/router";

import {LoginComponent} from "./staff/login/login.component";
import {HeaderComponent} from "./staffHome/header/header.component";
import {HomeComponent} from "./staffHome/home/home.component";
import {CandidatesComponent} from "./staffHome/candidates/candidates.component";
import {ScreeningComponent} from "./staffHome/candidates/screening.component";

const APP_ROUTES: Routes = [
  { path: '', component: LoginComponent },
  {path:'login', component:LoginComponent},
  {path:'header', component: HeaderComponent},
  {path:'home', component: HomeComponent}, //given in
  {path:'home/candidates', component: CandidatesComponent}, //called in header component
  {path:'candidates/screening', component: ScreeningComponent}//called in candidates tab



];


export const routing =RouterModule.forRoot(APP_ROUTES);
