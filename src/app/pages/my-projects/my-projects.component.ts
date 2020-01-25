import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit, OnDestroy {
  public projects: any;
  private projectsSub: Subscription;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.projectsSub = this.httpClient.get(`${environment.url}/projects`).subscribe((result: any) => {
      this.projects = result.projects;
    });
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe();
  }
}
