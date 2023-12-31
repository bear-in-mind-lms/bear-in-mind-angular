import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { map, Subscription, tap } from 'rxjs';
import { ApiErrorSnackBar } from '../../../api/api-error-snack-bar/api-error-snack-bar.service';
import { UserApiService } from '../../../api/user/user-api.service';
import { LoggedInUserService } from '../../../auth/logged-in-user.service';
import { UserRole } from '../../../auth/user-role';
import { AppRoute } from '../../../routing/app-route';
import { AppBarComponent } from '../../../shared/app-bar/app-bar.component';
import { PageContentComponent } from '../../../shared/page/content/page-content.component';
import { CardListPageSectionContentComponent } from '../../../shared/page/section/card-list/card-list-page-section-content.component';
import { PageSectionComponent } from '../../../shared/page/section/page-section.component';
import { LoggedInUserAvatarComponent } from '../../logged-in/logged-in-user-avatar.component';
import { UserConfig } from '../../user-config';
import { UserMainViewDto } from '../../user-main-view-dto';

@Component({
  selector: 'app-user-groups-page',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    MatListModule,
    PageContentComponent,
    AppBarComponent,
    PageSectionComponent,
    CardListPageSectionContentComponent,
    LoggedInUserAvatarComponent,
  ],
  templateUrl: './user-groups-page.component.html',
})
export class UserGroupsPageComponent implements OnInit, OnDestroy {
  private userMainViewDtoSubscription?: Subscription;

  protected readonly userGroupRoute = AppRoute.userGroup.routerLink;
  protected readonly createUserGroupRoute = AppRoute.createUserGroup.routerLink;

  protected readonly registeredUserGroupsRoute =
    AppRoute.registeredUserGroups.routerLink;
  protected readonly availableUserGroupsRoute =
    AppRoute.availableUserGroups.routerLink;
  protected readonly groupMembersRoute = AppRoute.groupMembers.routerLink;
  protected readonly teachersRoute = AppRoute.teachers.routerLink;
  protected readonly studentsRoute = AppRoute.students.routerLink;

  protected readonly userImagePlaceholder = UserConfig.imagePlaceholder;
  protected readonly emptyRegisteredUserGroupsPlaceholder =
    'assets/graphics/empty-registered-groups.png';
  protected readonly emptyAvailableUserGroupsPlaceholder =
    'assets/graphics/empty-available-groups.png';

  protected userMainViewDto?: UserMainViewDto;

  protected hasTeacherRole!: boolean;

  constructor(
    private readonly loggedInUser: LoggedInUserService,
    private readonly userApi: UserApiService,
    private readonly snackBar: ApiErrorSnackBar,
  ) {}

  ngOnInit() {
    this.userMainViewDtoSubscription = this.userApi
      .findUserMainViewDto(3)
      .pipe(
        tap((response) => this.snackBar.openOnFailure(response)),
        map(
          (response) =>
            (this.userMainViewDto = response.content ?? {
              registeredGroups: [],
              availableGroups: [],
              hasStudents: false,
              hasTeachers: false,
            }),
        ),
      )
      .subscribe();

    this.hasTeacherRole = this.loggedInUser.hasRole(UserRole.teacher);
  }

  ngOnDestroy() {
    this.userMainViewDtoSubscription?.unsubscribe();
  }
}
