import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user: any;
  private userSub: Subscription;
  public query: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSub = this.userService.getUserObservable().subscribe((user) => {
      this.user = user;
    });

    this.userService.getUser();
  }

  search() {
    const query = encodeURI(this.query);

    if (this.query) {
      this.router.navigate([`/search/${query}`]);
    }
  }

  logout() {
    this.userService.logoutUser();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
