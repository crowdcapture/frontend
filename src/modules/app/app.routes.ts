import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
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

import { FaqComponent } from './pages/faq/faq.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { ValidateComponent } from './pages/validate/validate.component';
import { EditProjectComponent } from './pages/edit-project/edit-project.component';
import { TermsComponent } from './pages/terms/terms.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AuthGuard } from '../root/services/auth.guard';

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
    path: 'contact',
    component: ContactComponent
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
    path: 'terms',
    component: TermsComponent
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
    path: 'edit/:projectId',
    canActivate: [AuthGuard],
    component: EditProjectComponent
  },
  {
    path: 'validate/:projectId',
    canActivate: [AuthGuard],
    component: ValidateComponent
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
