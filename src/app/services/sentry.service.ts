import { Injectable, ErrorHandler } from '@angular/core';
import { init, captureException, setTag } from '@sentry/browser';
import { environment } from '../../environments/environment';

init({
    dsn: 'https://41fe6a7511e7494e869fba365e2a1955@sentry.io/3738157'
});

@Injectable({
  providedIn: 'root'
})
export class SentryService implements ErrorHandler {
  constructor() {}

  handleError(error) {
    if (!environment.production) {
        console.log(error);
    } else {
        setTag('environment', 'production');
        captureException(error.originalError || error);
    }
  }
}
