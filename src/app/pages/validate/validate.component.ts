import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent implements OnInit, OnDestroy {
  public id: string;
  public project: any;
  public image: any;
  public validatingPositive: string;
  public selectedReason: string;
  public reasons: any;

  private projectSub: Subscription;
  private imageSub: Subscription;
  private reasonsSub: Subscription;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('projectId');

    this.projectSub = this.httpClient
      .get(`${environment.url}/project/${this.id}`)
      .subscribe((project: any) => {
        this.project = project.project;
      });

    this.reasonsSub = this.httpClient
      .get(`${environment.url}/reasons`)
      .subscribe((reasons: any) => {
        this.reasons = reasons.reasons;
      });

    this.getNewImage();
  }

  private getNewImage() {
    this.imageSub = this.httpClient
      .get(`${environment.url}/image/${this.id}/validate`)
      .subscribe((image: any) => {
        this.image = image.image[0];
      });
  }

  public validateImage() {
      const body = {
          rejected: (this.validatingPositive === 'false'),
          rejection_reason: this.selectedReason || null
      };

      this.httpClient.post(`${environment.url}/image/${this.image.id}/validate`, body).subscribe((result: any) => {
          if (result.success) {
              this.getNewImage();
          }
      });
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
    this.imageSub.unsubscribe();
    this.reasonsSub.unsubscribe();
  }
}
