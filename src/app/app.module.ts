import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomNewUserComponent } from './authentification/welcom-new-user/welcom-new-user.component';
import { SigninComponent } from './authentification/signin/signin.component';
import { SignupComponent } from './authentification/signup/signup.component';
import { ForgotPasswordComponent } from './authentification/forgot-password/forgot-password.component';
import { HomeComponent } from './frontOffice/home/home.component';
import { DashHomeComponent } from './backOffice/dash-home/dash-home.component';
import { NotFoundComponent } from './not-found/not-found/not-found.component';
import { AboutComponent } from './frontOffice/about/about.component';
import { ClientLayoutComponent } from './frontOffice/client-layout/client-layout.component';
import { ClientNavBarComponent } from './frontOffice/client-nav-bar/client-nav-bar.component';
import { FooterComponent } from './frontOffice/footer/footer.component';
import { OurClientsComponent } from './frontOffice/our-clients/our-clients.component';
import { SolutionsComponent } from './frontOffice/solutions/solutions.component';
import { UnauthorizedComponent } from './backOffice/unauthorized/unauthorized.component';
import { DashboardNavBarComponent } from './backOffice/dashboard-nav-bar/dashboard-nav-bar.component';
import { DashboardLayoutComponent } from './backOffice/dashboard-layout/dashboard-layout.component';
import { CreateUserComponent } from './backOffice/Modules/User Management/create-user/create-user.component';
import { HomeUserComponent } from './backOffice/Modules/User Management/home-user/home-user.component';
import { UserManagementComponent } from './backOffice/Modules/User Management/user-management/user-management.component';
import { UserListComponent } from './backOffice/Modules/User Management/user-list/user-list.component';
import { CreateRoleComponent } from './backOffice/Modules/User Management/role-management/create-role/create-role.component';
import { RoleAssignmentComponent } from './backOffice/Modules/User Management/role-management/role-assignment/role-assignment.component';
import { RoleListComponent } from './backOffice/Modules/User Management/role-management/role-list/role-list.component';
import { UpdateComponent } from './backOffice/Modules/User Management/role-management/update/update.component';
import { AuthInterceptorService } from './authentification/services/auth-interceptor.service';
import { AddClientComponent } from './backOffice/Modules/User Management/add-client/add-client.component';
import { CommandeListComponent } from 'src/app/backOffice/Modules/Commande/commande-list/commande-list.component'; 
import { CommandeFormComponent } from 'src/app/backOffice/Modules/Commande/commande-form/commande-form.component'; 


@NgModule({
  declarations: [
    AppComponent,
    WelcomNewUserComponent,
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    HomeComponent,
    DashHomeComponent,
    NotFoundComponent,
    AboutComponent,
    ClientLayoutComponent,
    ClientNavBarComponent,
    FooterComponent,
    OurClientsComponent,
    SolutionsComponent,
    UnauthorizedComponent,
    DashboardNavBarComponent,
    DashboardLayoutComponent,
    CreateUserComponent,
    HomeUserComponent,
    UserManagementComponent,
    UserListComponent,
    CreateRoleComponent,
    RoleAssignmentComponent,
    RoleListComponent,
    UpdateComponent,
    AddClientComponent,
    CommandeListComponent,
    CommandeFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    
    
    RouterModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }