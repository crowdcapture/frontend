import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {
  private projectId: string;
  private projectSub: Subscription;

  public project: any;
  public uploadedFiles: any[] = [];
  public permission: boolean;

  constructor(
    private httpClient: HttpClient,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');

    this.projectSub = this.httpClient.get(`${environment.url}/project/${this.projectId}`).subscribe((project: any) => {
      this.project = project.project;
    });
  }

  fileChange(files: FileList) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < files.length; i++) {
          const url = URL.createObjectURL(files[i]);

          const image = new Image();
          image.src = url;

          image.onload = () => {
            const imageObj: any = {
              file: files[i],
              url,
              preview: this.domSanitizer.bypassSecurityTrustUrl(url),
              width: image.width,
              height: image.height,
              uploading: false,
              uploaded: false,
              toolarge: files[i].size > 25000000
            };

            if (this.project.minHeight || this.project.minWidth) {
              if (this.project.minHeight > imageObj.height || this.project.minWidth > imageObj.width) {
                imageObj.error = `This image is smaller than the project requirements (${this.project.minWidth} x ${this.project.minHeight})`;
              }
            }

            this.uploadedFiles.push(imageObj);
          };
      }
  }

  async upload() {
    for (const image of this.uploadedFiles) {
      if (!image.uploading && !image.uploaded && !image.toolarge && !image.error) {
        image.uploading = true;
        image.error = null;

        const formData = new FormData();
        formData.append('fileArray', image.file, image.file.name);

        try {
          await this.httpClient.post(`${environment.url}/project/${this.projectId}/upload`, formData).toPromise();

          image.uploading = false;
          image.uploaded = true;
        } catch (error) {
          if (error.status === 400) {
            image.error = error.error.message;
          } else {
            image.error = 'Something went wrong.';
          }

          image.uploading = false;
          image.uploaded = false;
        }
      }
    }
  }

  deleteImage(file) {
    const index = this.uploadedFiles.findIndex((image) => file.url === image.url);

    this.uploadedFiles.splice(index, 1);

    URL.revokeObjectURL(file.url);
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();

    // Clean up the images because this can cause memory leaks.
    if (this.uploadedFiles.length > 0) {
      this.uploadedFiles.forEach((image) => {
        URL.revokeObjectURL(image.url);
      });
    }
  }
}
