import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit, OnDestroy {
  public id: string;
  public project: any;
  public images: any;
  public user: any;

  private projectSub: Subscription;
  private imageSub: Subscription;
  private userSub: Subscription;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('projectId');

    this.projectSub = this.httpClient.get(`${environment.url}/project/${this.id}`).subscribe((project: any) => {
      this.project = project.project;
    });

    this.imageSub = this.httpClient.get(`${environment.url}/images/${this.id}`).subscribe((images: any) => {
      this.images = images;
    });

    this.userSub = this.userService.getUserObservable().subscribe((user) => {
      this.user = user;
    });

    this.userService.getUser();
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
    this.imageSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  download() {
    window.open(this.project.latest_bundle_url);
  }
}
