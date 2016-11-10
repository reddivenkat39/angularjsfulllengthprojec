/**
 * Created by bapirazz naidu on 11/8/2016.
 */
import { RouterModule,Routes} from "@angular/router";

import {LoginComponent} from "./staff/login/login.component";
import {HeaderComponent} from "./header/header.component";

const APP_ROUTES: Routes = [
  { path: '', component: LoginComponent },
  {path:'', component: HeaderComponent}
];


export const routing =RouterModule.forRoot(APP_ROUTES);
