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
import { UserEditComponent } from './components/admin-welcome-page/users/user-edit/user-edit.component';
import { TeaPotComponent } from './components/tea-pot/tea-pot.component';

const routes: Routes = [
  { path : '', component : IndexComponent},
  { path: 'login', component: IndexComponent},
  { path: 'score', component: ScoreComponent},
  { path: 'admin/welcome',
    component: AdminWelcomePageComponent,
    canActivate: [AuthGuardService],
    data: {authGuardRedirect: '/login',
    role: userRoles.ADMIN}
  },
  { path: 'barkeeper/welcome',
    component: BarkeeperWelcomePageComponent,
    canActivate: [AuthGuardService],
    data: {authGuardRedirect: '/login',
    role: userRoles.ADMIN}
  },
  { path: 'editTeam/:teamId',
    component: TeamEditComponent,
    canActivate: [AuthGuardService],
    data: {authGuardRedirect: '/login',
    role: userRoles.ADMIN}
  },
  { path: 'editTeam/',
    component: TeamEditComponent,
    canActivate: [AuthGuardService],
    data: {authGuardRedirect: '/login',
    role: userRoles.ADMIN}
  },
  { path: 'editTeam',
    component: TeamEditComponent,
    canActivate: [AuthGuardService],
    data: {authGuardRedirect: '/login',
    role: userRoles.ADMIN}
  },
  { path: 'editUser/:userId',
    component: UserEditComponent,
    canActivate: [AuthGuardService],
    data: {authGuardRedirect: '/login',
    role: userRoles.ADMIN}
  },
  { path: 'editUser/',
    component: UserEditComponent,
    canActivate: [AuthGuardService],
    data: {authGuardRedirect: '/login',
    role: userRoles.ADMIN}
  },
  { path: 'editUser',
    component: UserEditComponent,
    canActivate: [AuthGuardService],
    data: {authGuardRedirect: '/login',
    role: userRoles.ADMIN}
  },
  {
    path: 'imATeaPot',
    component: TeaPotComponent,
  }
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
