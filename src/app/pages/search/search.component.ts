import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  private searchSub: Subscription;

  public query: string;
  public createdBy: string;
  public searchResult: any;
  public loggedIn: boolean;
  public user: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private httpClient: HttpClient) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');

    if (this.user) {
      this.user = JSON.parse(this.user);
    }

    this.searchSub = combineLatest([this.activeRoute.params, this.activeRoute.queryParams])
      .pipe(map(results => ({params: results[0].query, query: results[1]})))
      .subscribe((results) => {
        this.createdBy = results.query.createdBy;
        this.query = results.params;

        this.search();
      });

    this.loggedIn = this.userService.isLoggedIn();
  }

  async search() {
    this.searchResult = await this.httpClient.post(`${environment.url}/search`, {
      query: this.query,
      user_id: this.user ? this.user.id : null,
      filter: {
        createdBy: this.createdBy
      }
    }).toPromise();
  }

  setCreatedBy(value) {
    this.router.navigate([`/search/${encodeURI(this.query)}`], { queryParams: {createdBy: value} });
  }

  trackByFn(index, item) {
    return item.id;
  }

  ngOnDestroy() {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }
}
