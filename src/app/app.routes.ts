/**
 * Created by bapirazz naidu on 11/8/2016.
 */
import { RouterModule,Routes} from "@angular/router";

import {LoginComponent} from "./staff/login/login.component";
import {HeaderComponent} from "./staffHome/header/header.component";
import {HomeComponent} from "./staffHome/home/home.component";
import {CandidatesComponent} from "./staffHome/candidates/candidates.component";

const APP_ROUTES: Routes = [
  { path: '', component: LoginComponent },
  {path:'login', component:LoginComponent},
  {path:'header', component: HeaderComponent},
  {path:'home', component: HomeComponent},
  {path:'home/candidates', component: CandidatesComponent},

];


export const routing =RouterModule.forRoot(APP_ROUTES);
