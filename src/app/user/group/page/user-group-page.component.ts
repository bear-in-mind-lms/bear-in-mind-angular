import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ApiErrorSnackBar } from '../../../api/api-error-snack-bar/api-error-snack-bar.service';
import { ApiResponse } from '../../../api/api-response';
import { UserGroupApiService } from '../../../api/user/user-group-api.service';
import { AppRoute, AppRouteParam } from '../../../routing/app-route';
import { AppBarComponent } from '../../../shared/app-bar/app-bar.component';
import { ListItemComponent } from '../../../shared/list-item/list-item.component';
import { PageContentComponent } from '../../../shared/page/content/page-content.component';
import { reloadPage } from '../../../shared/router-utils';
import { UserConfig } from '../../user-config';
import { UserGroupDto } from '../user-group-dto';
import { UserGroupRole } from '../user-group-role';

@Component({
  selector: 'app-user-group-page',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    AppBarComponent,
    PageContentComponent,
    ListItemComponent,
  ],
  templateUrl: './user-group-page.component.html',
})
export class UserGroupPageComponent implements OnInit, OnDestroy {
  readonly previousLocation = AppRoute.users.routerLink;
  readonly userRoute = AppRoute.user.routerLink;
  readonly userGroupImagePlaceholder = UserConfig.imagePlaceholder;

  joinSubscription?: Subscription;

  userGroupId!: number;
  userGroupDtoObservable!: Observable<ApiResponse<UserGroupDto>>;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly userGroupApi: UserGroupApiService,
    private readonly snackBar: ApiErrorSnackBar,
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.userGroupId = Number(routeParams.get(AppRouteParam.id));

    this.userGroupDtoObservable = this.userGroupApi.findUserGroupDtoBy(
      this.userGroupId,
    );
  }

  ngOnDestroy() {
    this.joinSubscription?.unsubscribe();
  }

  joinGroup() {
    this.joinSubscription = this.userGroupApi
      .join(this.userGroupId)
      .subscribe((response) => {
        if (response.isSuccess()) {
          reloadPage(this.router);
        } else {
          this.snackBar.open(response.error!);
        }
      });
  }

  hasFab(content: UserGroupDto) {
    const role = content.role;
    return (
      role === undefined ||
      role === UserGroupRole.applicant ||
      role === UserGroupRole.invited
    );
  }
}
