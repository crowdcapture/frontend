import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectOverviewComponent } from './pages/project-overview/project-overview.component';
import { UserOverviewComponent } from './pages/user-overview/user-overview.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { SearchComponent } from './pages/search/search.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { UploadComponent } from './pages/upload/upload.component';
import { ProjectAllComponent } from './pages/project-all/project-all.component';
import { AccountCreatedComponent } from './pages/account-created/account-created.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { ConfirmationDoneComponent } from './pages/confirmation-done/confirmation-done.component';
import { AccountResetComponent } from './pages/account-reset/account-reset.component';
import { ResetComponent } from './pages/reset/reset.component';
import { PasswordComponent } from './pages/password/password.component';
import { AccountPasswordComponent } from './pages/account-password/account-password.component';
import { AuthGuard } from './services/auth.guard';
import { FaqComponent } from './pages/faq/faq.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

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
    path: 'faq',
    component: FaqComponent
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
    path: 'search/:query',
    component: SearchComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'upload/:projectId',
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
