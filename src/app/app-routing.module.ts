import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './frontOffice/home/home.component';
import { SigninComponent } from './authentification/signin/signin.component';
import { SignupComponent } from './authentification/signup/signup.component';
import { WelcomNewUserComponent } from './authentification/welcom-new-user/welcom-new-user.component';
import { ForgotPasswordComponent } from './authentification/forgot-password/forgot-password.component';
import { DashHomeComponent } from './backOffice/dash-home/dash-home.component';
import { NotFoundComponent } from './not-found/not-found/not-found.component';

const routes: Routes = [
   // Default Redirect to Client Home
 { path: '', redirectTo: '/client', pathMatch: 'full' },

 // FrontOffice Layout
 {
   path: 'client',
   component: HomeComponent,
   children: [
     { path: '', component: HomeComponent },
   
   ],
 },

 // Authentication
 { path: 'signin', component: SigninComponent },
 { path: 'signup', component: SignupComponent },
 { path: 'welcome', component: WelcomNewUserComponent },
 { path: 'forgotPassword', component: ForgotPasswordComponent },

 // BackOffice Layout (Dashboard)
 {
   path: 'dashboard',
   component: DashHomeComponent,
   children: [
     { path: '', component: DashHomeComponent },
     
   ],
 },

 // Not Found Page
 { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
