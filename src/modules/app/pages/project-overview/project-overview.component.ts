import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Subscription, fromEvent } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserService } from 'src/modules/shared/services/user.service';
import { Meta } from '@angular/platform-browser';

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
  public currentLightbox: any;
  public showLightbox = false;

  private projectSub: Subscription;
  private imageSub: Subscription;
  private userSub: Subscription;
  private scrollSub: Subscription;
  private oldMeta: string;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private metaService: Meta,
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

    this.oldMeta = this.metaService.getTag('description').content;
    this.metaService.updateTag({ name: 'description', content: `CrowdCapture project: ${this.project.title}` });
  }

  trackByFn(index, item) {
    return item.id;
  }

  download() {
    window.open(this.project.latest_bundle_url);
  }

  lightbox(image) {
    this.currentLightbox = image;
    this.showLightbox = true;

    this.scrollSub = fromEvent(window, 'scroll')
      .pipe(
        delay(400)
      )
      .subscribe(() => {
        this.closeLightbox();
      });
  }

  closeLightbox() {
    this.currentLightbox = null;
    this.showLightbox = false;

    if (this.scrollSub) {
      this.scrollSub.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.metaService.updateTag({ name: 'description', content: this.oldMeta });

    this.projectSub.unsubscribe();
    this.imageSub.unsubscribe();
    this.userSub.unsubscribe();

    if (this.scrollSub) {
      this.scrollSub.unsubscribe();
    }
  }
}
