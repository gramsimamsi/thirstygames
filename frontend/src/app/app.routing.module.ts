import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import {LoginComponent} from './login/login.component';
import {AdminWelcomePageComponent} from './admin-welcome-page/admin-welcome-page.component';
import {AuthGuardService} from './services/authGuard/auth-guard.service';
import {BarkeeperWelcomePageComponent} from './barkeeper-welcome-page/barkeeper-welcome-page.component';
import {userRoles} from '../environments/environment';
import {CreateUserComponent} from './create-user/create-user.component';
import {IndexComponent} from './index/index.component';

const routes: Routes = [
  { path : '', component : IndexComponent},
  { path: 'admin/welcome',
    component: AdminWelcomePageComponent,
    canActivate: [AuthGuardService],
    data: {authGuardRedirect: '/login', role: userRoles.ADMIN}
  },
  { path: 'login', component: IndexComponent},
  { path: 'barkeeper/welcome',
    component: BarkeeperWelcomePageComponent,
    canActivate: [AuthGuardService],
    data: {authGuardRedirect: '/login',
    role: userRoles.BARKEEPER}
  },
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
