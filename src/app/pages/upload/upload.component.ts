import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  private uploadedFiles: File[] = [];
  private projectId: string;

  public permission: boolean;
  public owner: boolean;

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
  }

  fileChange(element) {
      this.uploadedFiles.push(element.target.files);
      console.log(this.uploadedFiles);
  }

  upload() {
      const formData = new FormData();

      for (var i = 0; i < this.uploadedFiles.length; i++) {
          formData.append('fileArray', this.uploadedFiles[i], this.uploadedFiles[i].name);
      }

      this.httpClient.post(`${environment.url}/project/${this.projectId}/upload`, formData).subscribe((response) => {
          console.log('response received is ', response);
      });
  }
}
