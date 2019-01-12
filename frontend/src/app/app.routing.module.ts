import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import {AdminWelcomePageComponent} from './admin-welcome-page/admin-welcome-page.component';
import {AuthGuardService} from './services/authGuard/auth-guard.service';
import {BarkeeperWelcomePageComponent} from './barkeeper-welcome-page/barkeeper-welcome-page.component';
import {userRoles} from '../environments/environment';
import {IndexComponent} from './index/index.component';
import { ScoreComponent } from './score/score.component';

const routes: Routes = [
  { path : '', component : IndexComponent},
  { path: 'login', component: IndexComponent},
  { path: 'admin/welcome',
    component: AdminWelcomePageComponent,
    canActivate: [AuthGuardService],
    data: {authGuardRedirect: '/login', role: userRoles.ADMIN}
  },
  { path: 'barkeeper/welcome',
    component: BarkeeperWelcomePageComponent,
    canActivate: [AuthGuardService],
    data: {authGuardRedirect: '/login',
    role: userRoles.ADMIN}
  },
  { path: 'score',
    component: ScoreComponent,
    canActivate: [AuthGuardService],
    data: {authGuardRedirect: '/login', role: userRoles.ADMIN}
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
