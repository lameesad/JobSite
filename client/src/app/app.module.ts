import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { MenubarModule } from "primeng/menubar";
import { SlideMenuModule } from "primeng/slidemenu";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./components/login/login.component";
import { UserDashboardComponent } from "./components/user-dashboard/user-dashboard.component";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { UserSidebarComponent } from "./components/user-dashboard/components/user-sidebar/user-sidebar.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonModule } from "primeng/button";
import { MenuModule } from "primeng/menu";
import { AllJobsComponent } from "./components/admin-dashboard/components/all-jobs/all-jobs.component";
import { AuthInterceptor } from "./shared/interceptors/auth.interceptor";
import { APP_BASE_HREF } from "@angular/common";
import { AddJobComponent } from "./components/admin-dashboard/components/add-job/add-job.component";
import { AllUsersComponent } from "./components/admin-dashboard/components/all-users/all-users.component";
import { JobApplicantsComponent } from "./components/admin-dashboard/components/job-applicants/job-applicants.component";
import { UserJobsComponent } from "./components/user-dashboard/components/user-jobs/user-jobs.component";
import { UserProfileComponent } from "./components/user-dashboard/components/user-profile/user-profile.component";
import { StatsComponent } from "./components/admin-dashboard/components/stats/stats.component";
import { ChartModule } from "primeng/chart";
import { EditJobComponent } from './components/admin-dashboard/components/edit-job/edit-job.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    UserSidebarComponent,
    AllJobsComponent,
    AddJobComponent,
    AllUsersComponent,
    JobApplicantsComponent,
    UserJobsComponent,
    UserProfileComponent,
    StatsComponent,
    EditJobComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SlideMenuModule,
    AppRoutingModule,
    MenubarModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule,
    ChartModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: APP_BASE_HREF, useValue: "/" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
