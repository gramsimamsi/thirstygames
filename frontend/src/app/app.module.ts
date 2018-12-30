import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {MaterialModule} from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FlexLayoutModule} from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppRoutingModule} from './app.routing.module';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CreateUserComponent } from './create-user/create-user.component';
import {environment} from '../environments/environment';
import {BaseUrlInterceptor} from './Utilites/base-urlinterceptor';
import {AccessTokenInterceptor} from './Utilites/accessToken-interceptor';
import { UsersComponent } from './users/users.component';
import { AdminWelcomePageComponent } from './admin-welcome-page/admin-welcome-page.component';
import { EventComponent } from './event/event.component';
import { LogoutComponent } from './logout/logout.component';
import { BarkeeperWelcomePageComponent } from './barkeeper-welcome-page/barkeeper-welcome-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    UsersComponent,
    AdminWelcomePageComponent,
    EventComponent,
    LogoutComponent,
    BarkeeperWelcomePageComponent,

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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    },
    {
      provide: 'BASE_API_URL',
      useValue: environment.apiBaseURL
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
