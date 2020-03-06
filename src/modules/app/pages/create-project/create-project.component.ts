import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  public resolution = false;
  public permission = false;
  public createForm: FormGroup;
  public loading = false;
  public error: string;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(64)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      instruction: ['', [Validators.maxLength(500)]],
      minHeight: [],
      minWidth: []
    });
  }

  get f() {
    return this.createForm.controls;
  }

  onSubmit() {
    if (this.createForm.invalid) {
      return;
    }

    this.loading = true;

    const body = {
      title: this.f.title.value,
      description: this.f.description.value,
      instruction: this.f.instruction.value,
      minHeight: this.f.minHeight.value,
      minWidth: this.f.minWidth.value,
    };

    this.httpClient.post(`${environment.url}/project`, body)
      .subscribe(
        (result: any) => {
          if (result) {
            this.loading = false;

            this.router.navigate([`/project/${result.project.id}`]);
          }
        },
        error => {
          this.loading = false;

          if (error) {
            this.error = error.message;
          } else {
            this.error = 'Something went wrong, try again later';
          }
        }
      );
  }
}
