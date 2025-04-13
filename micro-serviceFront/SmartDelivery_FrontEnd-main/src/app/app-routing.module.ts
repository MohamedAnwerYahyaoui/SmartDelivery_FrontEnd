import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './frontOffice/home/home.component';
import { SigninComponent } from './authentification/signin/signin.component';
import { SignupComponent } from './authentification/signup/signup.component';
import { WelcomNewUserComponent } from './authentification/welcom-new-user/welcom-new-user.component';
import { ForgotPasswordComponent } from './authentification/forgot-password/forgot-password.component';
import { DashHomeComponent } from './backOffice/dash-home/dash-home.component';
import { NotFoundComponent } from './not-found/not-found/not-found.component';
import { DashboardLayoutComponent } from './backOffice/dashboard-layout/dashboard-layout.component';
import { UnauthorizedComponent } from './backOffice/unauthorized/unauthorized.component';
import { AboutComponent } from './frontOffice/about/about.component';
import { ClientLayoutComponent } from './frontOffice/client-layout/client-layout.component';
import { OurClientsComponent } from './frontOffice/our-clients/our-clients.component';
import { SolutionsComponent } from './frontOffice/solutions/solutions.component';
import { AuthGaurdservService } from './authentification/services/auth-gaurdserv.service';
import { HomeUserComponent } from './backOffice/Modules/User Management/home-user/home-user.component';
import { UserManagementComponent } from './backOffice/Modules/User Management/user-management/user-management.component';
import { RoleGaurdService } from './authentification/services/role-gaurd.service';
import { CreateUserComponent } from './backOffice/Modules/User Management/create-user/create-user.component';
import { CreateRoleComponent } from './backOffice/Modules/User Management/role-management/create-role/create-role.component';
import { RoleAssignmentComponent } from './backOffice/Modules/User Management/role-management/role-assignment/role-assignment.component';
import { RoleListComponent } from './backOffice/Modules/User Management/role-management/role-list/role-list.component';
import { UpdateComponent } from './backOffice/Modules/User Management/role-management/update/update.component';
import { UserListComponent } from './backOffice/Modules/User Management/user-list/user-list.component';
import { FournisseurListComponent } from './backOffice/Modules/Fournisseur/fournisseur-list/fournisseur-list.component';
import { FournisseurFormComponent } from './backOffice/Modules/Fournisseur/fournisseur-form/fournisseur-form.component';
const routes: Routes = [
  // Default Redirect to Client Home
  { path: '', redirectTo: '/client', pathMatch: 'full' },

  // FrontOffice Layout
  {
    path: 'client',
    component: ClientLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'solutions', component: SolutionsComponent },
      { path: 'projects', component: OurClientsComponent },

    ],
  },
 
  // Authentication
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'password-reset', component: WelcomNewUserComponent }, 
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'welcome', component: WelcomNewUserComponent },
 
  // BackOffice Layout (Dashboard)
  {
    path: 'dashboard',
   component: DashboardLayoutComponent,
   //canActivate: [AuthGaurdservService],
   children: [
      { path: '', component: HomeUserComponent },
      { path: 'user/management-user', component: UserManagementComponent ,  canActivate: [RoleGaurdService], data: { roles: ['ADMIN'] }},
      
      { path: 'user/RoleAssignment', component: RoleAssignmentComponent ,  canActivate: [RoleGaurdService], data: { roles: ['ADMIN'] }}, 
      { path: 'user/usersList', component: UserListComponent ,  canActivate: [RoleGaurdService], data: { roles: ['ADMIN'] }},
      { path: 'user/createUser', component: CreateUserComponent ,  canActivate: [RoleGaurdService], data: { roles: ['ADMIN'] }},
      { path: 'user/rolesList', component: RoleListComponent ,  canActivate: [RoleGaurdService], data: { roles: ['ADMIN'] }},
      { path: 'user/updateRole/:name', component: UpdateComponent ,  canActivate: [RoleGaurdService], data: { roles: ['ADMIN'] }},
      { path: 'user/createRole', component: CreateRoleComponent ,  canActivate: [RoleGaurdService], data: { roles: ['ADMIN'] } },
      { path: 'Fournisseur/list', component: FournisseurListComponent },
      {path : 'Fournisseur/form',component :FournisseurFormComponent}
      ],
  },
 
  
 
  // Not Found Page
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
