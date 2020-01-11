import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-all',
  templateUrl: './project-all.component.html',
  styleUrls: ['./project-all.component.scss']
})
export class ProjectAllComponent implements OnInit, OnDestroy {
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
