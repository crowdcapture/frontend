import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user: any;
  private userSub: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log('onit');

    this.userSub = this.userService.getUserObservable().subscribe((user) => {
      this.user = user;
    });

    this.userService.getUser();
  }

  logout() {
    this.userService.logoutUser();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
