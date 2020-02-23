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
  public query: string;
  public mobileMenuOpen = false;

  private userSub: Subscription;
  private navSub: Subscription;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSub = this.userService.getUserObservable().subscribe((user) => {
      this.user = user;
    });

    this.userService.getUser();

    this.navSub = this.router.events.subscribe(() => {
      this.mobileMenuOpen = false;
    });
  }

  search() {
    const query = encodeURI(this.query);

    if (this.query) {
      this.router.navigate([`/search/${query}`]);
    }
  }

  logout() {
    this.router.navigate(['/home']);

    this.userService.logoutUser();
  }

  openMenu() {
    this.mobileMenuOpen = true;
  }

  closeMenu() {
    this.mobileMenuOpen = false;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.navSub.unsubscribe();
  }
}
