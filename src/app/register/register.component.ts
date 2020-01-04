import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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

    this.httpClient.post('http://localhost:3000/v1/register', body)
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
            this.error = error.message;
          } else {
            this.error = 'Something went wrong, try again later';
          }
        }
      );
  }
}
