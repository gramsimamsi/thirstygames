import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppRoutingModule} from './app.routing.module';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import {BaseUrlInterceptor} from './Utilites/base-urlinterceptor';
import {AccessTokenInterceptor} from './Utilites/accessToken-interceptor';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { LoginComponent } from './components/index/login/login.component';
import { CreateUserComponent } from './components/index/create-user/create-user.component';
import { UsersComponent } from './components/admin-welcome-page/users/users.component';
import { AdminWelcomePageComponent } from './components/admin-welcome-page/admin-welcome-page.component';
import { BarkeeperWelcomePageComponent } from './components/barkeeper-welcome-page/barkeeper-welcome-page.component';
import { BeverageComponent } from './components/admin-welcome-page/beverage/beverage.component';
import { TeamComponent } from './components/admin-welcome-page/team/team.component';
import { IndexComponent } from './components/index/index.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ScoreComponent } from './components/score/score.component';
import { TeamEditComponent } from './components/admin-welcome-page/team/team-edit/team-edit.component';
import { UserEditComponent } from './components/admin-welcome-page/users/user-edit/user-edit.component';
import { GuestPageComponent } from './components/guest-page/guest-page.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { TeaPotComponent } from './components/tea-pot/tea-pot.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    UsersComponent,
    AdminWelcomePageComponent,
    BarkeeperWelcomePageComponent,
    BeverageComponent,
    TeamComponent,
    IndexComponent,
    ToolbarComponent,
    ScoreComponent,
    TeamEditComponent,
    UserEditComponent,
    GuestPageComponent,
    WelcomePageComponent,
    TeaPotComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
