import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { AddJobComponent } from "./components/admin-dashboard/components/add-job/add-job.component";
import { AllJobsComponent } from "./components/admin-dashboard/components/all-jobs/all-jobs.component";
import { AllUsersComponent } from "./components/admin-dashboard/components/all-users/all-users.component";
import { EditJobComponent } from "./components/admin-dashboard/components/edit-job/edit-job.component";
import { JobApplicantsComponent } from "./components/admin-dashboard/components/job-applicants/job-applicants.component";
import { StatsComponent } from "./components/admin-dashboard/components/stats/stats.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { UserJobsComponent } from "./components/user-dashboard/components/user-jobs/user-jobs.component";
import { UserProfileComponent } from "./components/user-dashboard/components/user-profile/user-profile.component";
import { UserDashboardComponent } from "./components/user-dashboard/user-dashboard.component";
import { RoleGuardGuard } from "./shared/services/role.guard";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "user-dashboard", component: UserDashboardComponent },
  { path: "user-jobs", component: UserJobsComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "admin-dashboard", component: AdminDashboardComponent, canActivate: [RoleGuardGuard] },
  { path: "all-jobs", component: AllJobsComponent, canActivate: [RoleGuardGuard] },
  { path: "add-job", component: AddJobComponent, canActivate: [RoleGuardGuard] },
  { path: "all-users", component: AllUsersComponent, canActivate: [RoleGuardGuard] },
  { path: "job-applicants", component: JobApplicantsComponent, canActivate: [RoleGuardGuard] },
  { path: "stats", component: StatsComponent, canActivate: [RoleGuardGuard] },
  { path: "edit-job", component: EditJobComponent, canActivate: [RoleGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
