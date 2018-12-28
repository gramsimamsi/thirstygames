import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import {LoginComponent} from './login/login.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {UsersComponent} from './users/users.component';
import {AdminWelcomePageComponent} from './admin-welcome-page/admin-welcome-page.component';
import {EventComponent} from './event/event.component';
import {LogoutComponent} from './logout/logout.component';
import {AuthGuardService} from './services/authGuard/auth-guard.service';
import {BarkeeperWelcomePageComponent} from "./barkeeper-welcome-page/barkeeper-welcome-page.component";
import {userRoles} from "../environments/environment";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path : '', component : LoginComponent},
  { path: 'users', component: CreateUserComponent},
  { path: 'admin/users', component: UsersComponent, canActivate: [AuthGuardService], data: {authGuardRedirect: '/login', role: userRoles.ADMIN}},
  { path: 'admin/welcome', component: AdminWelcomePageComponent, canActivate: [AuthGuardService], data: {authGuardRedirect: '/login', role: userRoles.ADMIN}},
  { path: 'admin/events', component: EventComponent, canActivate: [AuthGuardService], data: {authGuardRedirect: '/login', role: userRoles.ADMIN}},
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
