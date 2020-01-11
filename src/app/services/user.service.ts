import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from '../models/user.model';

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

    getUser() {
        this.user.next(JSON.parse(localStorage.getItem('user')));
    }

    logoutUser() {
        localStorage.removeItem('user');
        this.user.next();
    }
}
