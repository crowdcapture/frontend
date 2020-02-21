import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectOverviewComponent } from './pages/project-overview/project-overview.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { UserOverviewComponent } from './pages/user-overview/user-overview.component';
import { SearchComponent } from './pages/search/search.component';
import { UploadComponent } from './pages/upload/upload.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProjectComponent } from './components/project/project.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { ProjectAllComponent } from './pages/project-all/project-all.component';
import { AccountCreatedComponent } from './pages/account-created/account-created.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { ConfirmationDoneComponent } from './pages/confirmation-done/confirmation-done.component';
import { ResetComponent } from './pages/reset/reset.component';
import { AccountResetComponent } from './pages/account-reset/account-reset.component';
import { PasswordComponent } from './pages/password/password.component';
import { AccountPasswordComponent } from './pages/account-password/account-password.component';
import { AuthGuard } from './services/auth.guard';
import { JwtInterceptor } from './services/jwt.interceptor';
import { FaqComponent } from './pages/faq/faq.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { ValidateComponent } from './pages/validate/validate.component';

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
    AccountPasswordComponent,
    FaqComponent,
    PrivacyComponent,
    ValidateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    UserService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
