import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import {AuthGuardService} from './services/authGuard/auth-guard.service';
import { IndexComponent } from './components/index/index.component';
import { AdminWelcomePageComponent } from './components/admin-welcome-page/admin-welcome-page.component';
import { userRoles } from 'src/environments/environment';
import { BarkeeperWelcomePageComponent } from './components/barkeeper-welcome-page/barkeeper-welcome-page.component';
import { ScoreComponent } from './components/score/score.component';
import { TeamEditComponent } from './components/admin-welcome-page/team/team-edit/team-edit.component';

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
  { path: 'editTeam/:teamId', component: TeamEditComponent },
  { path: 'editTeam/', component: TeamEditComponent },
  { path: 'editTeam', component: TeamEditComponent },
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
