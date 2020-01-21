import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { SearchComponent } from './search/search.component';
import { UploadComponent } from './upload/upload.component';
import { ValidateComponent } from './validate/validate.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProjectComponent } from './project/project.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { ProjectAllComponent } from './project-all/project-all.component';
import { AccountCreatedComponent } from './account-created/account-created.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ConfirmationDoneComponent } from './confirmation-done/confirmation-done.component';
import { ResetComponent } from './reset/reset.component';
import { AccountResetComponent } from './account-reset/account-reset.component';
import { PasswordComponent } from './password/password.component';
import { AccountPasswordComponent } from './account-password/account-password.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProjectOverviewComponent,
    MyProjectsComponent,
    UserOverviewComponent,
    SearchComponent,
    UploadComponent,
    ValidateComponent,
    CreateProjectComponent,
    HeaderComponent,
    FooterComponent,
    ProjectComponent,
    ProjectAllComponent,
    AccountCreatedComponent,
    ConfirmationComponent,
    ConfirmationDoneComponent,
    ResetComponent,
    AccountResetComponent,
    PasswordComponent,
    AccountPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
