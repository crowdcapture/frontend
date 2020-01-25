import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  public resetForm: FormGroup;
  public loading = false;
  public error: string;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.resetForm.controls;
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      return;
    }

    this.loading = true;

    const body = {
      email: this.f.email.value
    };

    this.httpClient.post(`${environment.url}/reset`, body)
      .subscribe(
        (result: User) => {
          if (result) {
            this.loading = false;

            this.router.navigate(['/account-reset']);
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
