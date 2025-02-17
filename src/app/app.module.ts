import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomNewUserComponent } from './authentification/welcom-new-user/welcom-new-user.component';
import { SigninComponent } from './authentification/signin/signin.component';
import { SignupComponent } from './authentification/signup/signup.component';
import { ForgotPasswordComponent } from './authentification/forgot-password/forgot-password.component';
import { HomeComponent } from './frontOffice/home/home.component';
import { DashHomeComponent } from './backOffice/dash-home/dash-home.component';
import { NotFoundComponent } from './not-found/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomNewUserComponent,
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    HomeComponent,
    DashHomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
