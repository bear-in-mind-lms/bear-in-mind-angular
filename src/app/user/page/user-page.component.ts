import {
  AsyncPipe,
  DatePipe,
  NgForOf,
  NgIf,
  NgOptimizedImage,
} from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ApiResponse } from '../../api/api-response';
import { UserApiService } from '../../api/user/user-api.service';
import { CourseConfig } from '../../course/course-config';
import { CourseListItemDto } from '../../course/course-list-item-dto';
import { AppRoute, AppRouteParam } from '../../routing/app-route';
import { AppBarComponent } from '../../shared/app-bar/app-bar.component';
import { ListItemComponent } from '../../shared/list-item/list-item.component';
import { PageContentComponent } from '../../shared/page/content/page-content.component';
import { PageSectionComponent } from '../../shared/page/section/page-section.component';
import { PageSectionContentPlaceholderComponent } from '../../shared/page/section/placeholder/page-section-content-placeholder.component';
import { InitialsPipe } from '../../shared/pipe/initials.pipe';
import { TextAvatarComponent } from '../../shared/text-avatar/text-avatar.component';
import { UserGroupListItemDto } from '../group/user-group-list-item-dto';
import { UserConfig } from '../user-config';
import { UserViewDto } from '../user-view-dto';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgOptimizedImage,
    AsyncPipe,
    DatePipe,
    MatCardModule,
    MatListModule,
    MatIconModule,
    AppBarComponent,
    PageContentComponent,
    PageSectionComponent,
    PageSectionContentPlaceholderComponent,
    TextAvatarComponent,
    InitialsPipe,
    ListItemComponent,
  ],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent {
  readonly previousLocation = AppRoute.users.routerLink;
  readonly courseRoute = AppRoute.course.routerLink;
  readonly userGroupRoute = AppRoute.userGroup.routerLink;

  readonly courseImagePlaceholder = CourseConfig.imagePlaceholder;
  readonly userGroupImagePlaceholder = UserConfig.imagePlaceholder;
  readonly emptyCoursesPlaceholder =
    'assets/graphics/empty-available-courses.png';
  readonly emptyGroupsPlaceholder =
    'assets/graphics/empty-available-groups.png';

  userId!: number;
  userViewDtoObservable!: Observable<ApiResponse<UserViewDto>>;

  userName!: string;
  userImage?: string;
  commonCourses!: CourseListItemDto[];
  commonGroups!: UserGroupListItemDto[];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly userApi: UserApiService,
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.userId = Number(routeParams.get(AppRouteParam.id));

    this.userViewDtoObservable = this.userApi
      .findUserViewDtoBy(this.userId)
      .pipe(
        tap((result) => {
          const content = result.content!;

          this.userName = content.name;
          this.userImage = content.image;
          this.commonCourses = content.courses ?? [];
          this.commonGroups = content.groups ?? [];
        }),
      );
  }
}
