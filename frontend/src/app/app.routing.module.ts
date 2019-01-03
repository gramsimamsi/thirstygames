import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import {LoginComponent} from './login/login.component';
import {AdminWelcomePageComponent} from './admin-welcome-page/admin-welcome-page.component';
import {LogoutComponent} from './logout/logout.component';
import {AuthGuardService} from './services/authGuard/auth-guard.service';
import {BarkeeperWelcomePageComponent} from "./barkeeper-welcome-page/barkeeper-welcome-page.component";
import {userRoles} from "../environments/environment";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path : '', component : LoginComponent},
  { path: 'admin/welcome', component: AdminWelcomePageComponent, canActivate: [AuthGuardService], data: {authGuardRedirect: '/login', role: userRoles.ADMIN}},
  { path: 'logout', component: LogoutComponent},
  {path: 'barkeeper/welcome', component: BarkeeperWelcomePageComponent, canActivate: [AuthGuardService], data: {authGuardRedirect: '/login', role: userRoles.BARKEEPER}}
];

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ],
})

export class AppRoutingModule { }
