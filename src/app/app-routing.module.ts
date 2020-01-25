import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { SearchComponent } from './search/search.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { UploadComponent } from './upload/upload.component';
import { ProjectAllComponent } from './project-all/project-all.component';
import { AccountCreatedComponent } from './account-created/account-created.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ConfirmationDoneComponent } from './confirmation-done/confirmation-done.component';
import { AccountResetComponent } from './account-reset/account-reset.component';
import { ResetComponent } from './reset/reset.component';
import { PasswordComponent } from './password/password.component';
import { AccountPasswordComponent } from './account-password/account-password.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'reset',
    component: ResetComponent
  },
  {
    path: 'password/:token',
    component: PasswordComponent
  },
  {
    path: 'account-password',
    component: AccountPasswordComponent
  },
  {
    path: 'account-created',
    component: AccountCreatedComponent
  },
  {
    path: 'account-reset',
    component: AccountResetComponent
  },
  {
    path: 'confirmation/:token',
    component: ConfirmationComponent
  },
  {
    path: 'confirmation-done',
    component: ConfirmationDoneComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'project/:projectId',
    component: ProjectOverviewComponent
  },
  {
    path: 'projects',
    component: ProjectAllComponent
  },
  {
    path: 'user/:userId',
    component: UserOverviewComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'upload',
    canActivate: [AuthGuard],
    component: UploadComponent
  },
  {
    path: 'my-projects',
    canActivate: [AuthGuard],
    component: MyProjectsComponent
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: CreateProjectComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
