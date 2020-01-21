import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  public passwordForm: FormGroup;
  public loading = false;
  public error: string;
  private token: string;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');

    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(512)]]
    });
  }

  get f() {
    return this.passwordForm.controls;
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }

    this.loading = true;

    const body = {
      password: this.f.password.value,
      token: this.token
    };

    this.httpClient.post(`${environment.url}/password`, body)
      .subscribe(
        result => {
          if (result) {
            this.loading = false;

            this.router.navigate(['/account-password']);
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
