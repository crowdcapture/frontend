import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
