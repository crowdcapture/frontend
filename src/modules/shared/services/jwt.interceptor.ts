import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('intercept!');
        
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.token) {
            request = request.clone({
                setHeaders: {
                    'x-access-token': user.token
                }
            });
        }

        return next.handle(request);
    }
}
