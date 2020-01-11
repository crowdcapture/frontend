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

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'upload',
    component: UploadComponent
  },
  {
    path: 'register',
    component: RegisterComponent
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
    path: 'my-projects',
    component: MyProjectsComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'create',
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
