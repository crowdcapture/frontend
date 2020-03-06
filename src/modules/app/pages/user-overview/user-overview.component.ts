import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit, OnDestroy {
  public user: any;
  public projects: any;

  private userSub: Subscription;
  private id: string;

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('userId');

    this.userSub = this.httpClient.get(`${environment.url}/user/${this.id}`).subscribe((result: any) => {
      this.user = result.user;
      this.projects = result.projects;
    });
  }

  trackByFn(index, item) {
    return item.id;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
