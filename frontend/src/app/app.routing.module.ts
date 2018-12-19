import {NgModule}  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import {LoginComponent} from './login/login.component';
import {CreateUserComponent} from "./create-user/create-user.component";
import {UsersComponent} from "./users/users.component";
import {AdminWelcomePageComponent} from "./admin-welcome-page/admin-welcome-page.component";
import {EventComponent} from "./event/event.component";
import {LogoutComponent} from "./logout/logout.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path : '', component : LoginComponent},
  { path: 'users', component: CreateUserComponent},
  { path: 'admin/users', component: UsersComponent},
  { path: 'admin/welcome', component: AdminWelcomePageComponent},
  { path: 'admin/events', component:EventComponent},
  { path: 'logout', component: LogoutComponent}
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
