import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public query: string;
  public searchResult: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private httpClient: HttpClient) { }

  ngOnInit() {
    this.routeSub = this.activeRoute.paramMap.subscribe(async (params) => {
      this.query = decodeURI(params.get('query'));

      this.searchResult = await this.httpClient.post(`${environment.url}/search`, {
        query: this.query
      }).toPromise();
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
