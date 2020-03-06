import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private user = new Subject<User>();

    setUser(user: User): void {
        this.user.next(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUserObservable(): Observable<User> {
        return this.user.asObservable();
    }

    isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));

        const jwt = new JwtHelperService();

        if (user && !jwt.isTokenExpired(user.token)) {
            return true;
        } else {
            return false;
        }
    }

    getUser() {
        this.user.next(JSON.parse(localStorage.getItem('user')));
    }

    logoutUser() {
        localStorage.removeItem('user');
        this.user.next();
    }
}
