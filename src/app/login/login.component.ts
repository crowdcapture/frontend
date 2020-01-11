import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading = false;
  public error: string;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const body = {
      email: this.f.email.value,
      password: this.f.password.value
    };

    this.httpClient.post(`${environment.url}/login`, body)
      .subscribe(
        (result: User) => {
          if (result) {
            this.loading = false;

            this.userService.setUser(result);

            this.router.navigate(['/home']);
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
