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
import { AboutComponent } from './frontOffice/about/about.component';
import { ClientLayoutComponent } from './frontOffice/client-layout/client-layout.component';
import { ClientNavBarComponent } from './frontOffice/client-nav-bar/client-nav-bar.component';
import { FooterComponent } from './frontOffice/footer/footer.component';
import { OurClientsComponent } from './frontOffice/our-clients/our-clients.component';
import { SolutionsComponent } from './frontOffice/solutions/solutions.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import { AddPromotionComponent } from './backOffice/Modules/PromotionManagement/add-promotion/add-promotion.component';
import { ListPromotionComponent } from './backOffice/Modules/PromotionManagement/list-promotion/list-promotion.component';
import { CommandeFormComponent } from './backOffice/Modules/Commande/commande-form/commande-form.component';
import { CommandeListComponent } from './backOffice/Modules/Commande/commande-list/commande-list.component';
import { NgChartsModule } from 'ng2-charts';
import { FournisseurFormComponent } from './backOffice/Modules/Fournisseur/fournisseur-form/fournisseur-form.component';
import { FournisseurListComponent } from './backOffice/Modules/Fournisseur/fournisseur-list/fournisseur-list.component';
import { GroupNotificationComponent } from './backOffice/Modules/Notification/group-notification/group-notification.component';
import { ListeNotificationComponent } from './backOffice/Modules/Notification/liste-notification/liste-notification.component';
import { NotificationHistoryComponent } from './backOffice/Modules/Notification/notification-history/notification-history.component';
import { NotificationStatsComponent } from './backOffice/Modules/Notification/notification-stats/notification-stats.component';
import { NotificationComponent } from './backOffice/Modules/Notification/notification/notification.component';
import { WebSocketComponent } from './backOffice/Modules/Notification/web-socket/web-socket.component';
import { RepasFormComponent } from './backOffice/Modules/restaurantmanagment/component/repas-form/repas-form.component';
import { RepasListComponent } from './backOffice/Modules/restaurantmanagment/component/repas-list/repas-list.component';
import { RestaurantFormComponent } from './backOffice/Modules/restaurantmanagment/component/restaurant-form/restaurant-form.component';
import { RestaurantListComponent } from './backOffice/Modules/restaurantmanagment/component/restaurant-list/restaurant-list.component';
import { RestaurantStatusComponent } from './backOffice/Modules/restaurantmanagment/component/restaurant-status/restaurant-status.component';
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
    AddPromotionComponent,
    ListPromotionComponent,
    CommandeFormComponent,
    CommandeListComponent,
    FournisseurFormComponent,
    FournisseurListComponent,
    GroupNotificationComponent,
    ListeNotificationComponent,
    NotificationHistoryComponent,
    NotificationStatsComponent,
    NotificationComponent,
    WebSocketComponent,
    RepasFormComponent,
    RepasListComponent,
    RestaurantFormComponent,
    RestaurantListComponent,
    RestaurantStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
