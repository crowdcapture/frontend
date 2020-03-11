import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { UserService } from 'src/modules/shared/services/user.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit, OnDestroy {
  public resolution = false;
  public permission = false;
  public editForm: FormGroup;
  public loading = false;
  public error: string;
  public user: any;
  public project: any;
  public id: string;

  private userSub: Subscription;
  private projectSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('projectId');

    this.userSub = this.userService.getUserObservable().subscribe((user) => {
      this.user = user;
    });

    this.userService.getUser();

    this.projectSub = this.httpClient.get(`${environment.url}/project/${this.id}`).subscribe((project: any) => {
      this.project = project.project;

      this.checkUser();

      this.editForm = this.formBuilder.group({
        title: [this.project.title, [Validators.required, Validators.maxLength(64)]],
        description: [this.project.description, [Validators.required, Validators.maxLength(1000)]],
        instruction: [this.project.instruction, [Validators.maxLength(500)]]
      });
    });
  }

  checkUser() {
    if (this.user.id !== this.project.created_by) {
      this.router.navigate([`/project/${this.project.id}`]);
    }
  }

  get f() {
    return this.editForm.controls;
  }

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }

    this.loading = true;

    const body = {
      id: this.id,
      title: this.f.title.value,
      description: this.f.description.value,
      instruction: this.f.instruction.value
    };

    this.httpClient.put(`${environment.url}/project`, body)
      .subscribe(
        (result: any) => {
          if (result) {
            this.loading = false;

            this.router.navigate([`/project/${this.id}`]);
          }
        },
        error => {
          this.loading = false;

          if (error) {
            this.error = error.message;
          } else {
            this.error = 'Something went wrong, try again later';
          }
        }
      );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
