import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private popularSub: Subscription;

  public popular: any;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.popularSub = this.httpClient.get(`${environment.url}/popular`).subscribe((result: any) => {
      this.popular = result.projects;
    });
  }

  trackByFn(index, item) {
    return item.id;
  }

  ngOnDestroy() {
    this.popularSub.unsubscribe();
  }
}
