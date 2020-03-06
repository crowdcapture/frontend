import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  public errorMessage: string;
  public loading: boolean;
  public error: boolean;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loading = true;
    const token = this.route.snapshot.paramMap.get('token');

    if (!token || token.length !== 16) {
      this.loading = false;
      this.error = true;
      this.errorMessage = 'This token is not valid, please click the link in the email.';
    } else {
      const body = {
        token
      };

      this.httpClient.post(`${environment.url}/confirmation`, body)
      .subscribe(
        result => {
          if (result) {
            this.loading = false;

            this.router.navigate(['/confirmation-done']);
          }
        },
        error => {
          this.loading = false;

          if (error) {
            this.error = error.message;
          } else {
            this.errorMessage = 'Something went wrong, try again later';
          }
        }
      );
    }
  }
}
