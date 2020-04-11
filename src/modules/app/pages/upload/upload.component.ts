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
  private projectPaused = false;

  public project: any;
  public progress = 0;
  public isUploading = false;
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
    let u = 0;
    this.isUploading = true;

    while (u < this.uploadedFiles.length && !this.projectPaused) {
      if (!this.uploadedFiles[u].uploading && !this.uploadedFiles[u].uploaded &&
      !this.uploadedFiles[u].toolarge && !this.uploadedFiles[u].error) {

        this.uploadedFiles[u].uploading = true;
        this.uploadedFiles[u].error = null;

        const formData = new FormData();
        formData.append('fileArray', this.uploadedFiles[u].file, this.uploadedFiles[u].file.name);

        try {
          await this.httpClient.post(`${environment.url}/project/${this.projectId}/upload`, formData).toPromise();

          this.uploadedFiles[u].uploaded = true;
        } catch (error) {
          if (error.status === 400) {
            this.uploadedFiles[u].error = error.error.message;
          } else {
            this.uploadedFiles[u].error = 'Something went wrong.';
            this.uploadedFiles[u].uploaded = false;
          }
        } finally {
          this.uploadedFiles[u].uploading = false;
          this.progress = (100 / this.uploadedFiles.length * (u + 1));
        }
      }

      u++;
    }

    this.isUploading = false;
  }

  deleteImage(file) {
    const index = this.uploadedFiles.findIndex((image) => file.url === image.url);

    this.uploadedFiles.splice(index, 1);

    URL.revokeObjectURL(file.url);
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();

    if (this.isUploading) {
      this.projectPaused = true;
    }

    // Clean up the images because this can cause memory leaks.
    if (this.uploadedFiles.length > 0) {
      this.uploadedFiles.forEach((image) => {
        URL.revokeObjectURL(image.url);
      });
    }
  }
}
