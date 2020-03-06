import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routes';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectOverviewComponent } from './pages/project-overview/project-overview.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { UserOverviewComponent } from './pages/user-overview/user-overview.component';
import { SearchComponent } from './pages/search/search.component';
import { UploadComponent } from './pages/upload/upload.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProjectAllComponent } from './pages/project-all/project-all.component';
import { AccountCreatedComponent } from './pages/account-created/account-created.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { ConfirmationDoneComponent } from './pages/confirmation-done/confirmation-done.component';
import { ResetComponent } from './pages/reset/reset.component';
import { AccountResetComponent } from './pages/account-reset/account-reset.component';
import { PasswordComponent } from './pages/password/password.component';
import { AccountPasswordComponent } from './pages/account-password/account-password.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { ValidateComponent } from './pages/validate/validate.component';
import { EditProjectComponent } from './pages/edit-project/edit-project.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProjectOverviewComponent,
    MyProjectsComponent,
    UserOverviewComponent,
    SearchComponent,
    UploadComponent,
    CreateProjectComponent,
    EditProjectComponent,
    ProjectAllComponent,
    AccountCreatedComponent,
    ConfirmationComponent,
    ConfirmationDoneComponent,
    ResetComponent,
    AccountResetComponent,
    PasswordComponent,
    AccountPasswordComponent,
    FaqComponent,
    PrivacyComponent,
    ValidateComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ]
})
export class AppModule { }
