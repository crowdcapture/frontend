import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public loading = false;
  public error: string;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(512)]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    const body = {
      username: this.f.username.value,
      email: this.f.email.value,
      password: this.f.password.value
    };

    this.httpClient.post(`${environment.url}/register`, body)
      .subscribe(
        result => {
          if (result) {
            this.loading = false;

            this.router.navigate(['/account-created']);
          }
        },
        error => {
          this.loading = false;

          if (error) {
            this.error = error.error.message;
          } else {
            this.error = 'Something went wrong, try again later';
          }
        }
      );
  }
}
