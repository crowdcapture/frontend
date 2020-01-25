import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit, OnDestroy {
  public id: string;
  public project: any;
  public images: any;

  private projectSub: Subscription;
  private imageSub: Subscription;

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('projectId');

    this.projectSub = this.httpClient.get(`${environment.url}/project/${this.id}`).subscribe((project: any) => {
      this.project = project.project;
    });

    this.imageSub = this.httpClient.get(`${environment.url}/images/${this.id}`).subscribe((images: any) => {
      this.images = images;
    });
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
    this.imageSub.unsubscribe();
  }

  download() {
    window.open(this.project.latest_bundle_url);
  }
}
