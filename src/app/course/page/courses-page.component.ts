import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { map, Subscription, tap } from 'rxjs';
import { ApiErrorSnackBar } from '../../api/api-error-snack-bar/api-error-snack-bar.service';
import { CourseApiService } from '../../api/course/course-api.service';
import { LoggedInUserService } from '../../auth/logged-in-user.service';
import { UserRole } from '../../auth/user-role';
import { AppRoute } from '../../routing/app-route';
import { AppBarComponent } from '../../shared/app-bar/app-bar.component';
import { PageContentComponent } from '../../shared/page/content/page-content.component';
import { CardListPageSectionContentComponent } from '../../shared/page/section/card-list/card-list-page-section-content.component';
import { PageSectionComponent } from '../../shared/page/section/page-section.component';
import { LoggedInUserAvatarComponent } from '../../user/logged-in/logged-in-user-avatar.component';
import { CourseConfig } from '../course-config';
import { CourseMainViewDto } from '../course-main-view-dto';

@Component({
  selector: 'app-courses-page',
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
  templateUrl: './courses-page.component.html',
})
export class CoursesPageComponent implements OnInit, OnDestroy {
  private courseMainViewDtoSubscription?: Subscription;

  protected readonly courseRoute = AppRoute.course.routerLink;
  protected readonly createCourseRoute = AppRoute.createCourse.routerLink;

  protected readonly conductedCoursesRoute =
    AppRoute.conductedCourses.routerLink;
  protected readonly activeCoursesRoute = AppRoute.activeCourses.routerLink;
  protected readonly availableCoursesRoute =
    AppRoute.availableCourses.routerLink;
  protected readonly completedCoursesRoute =
    AppRoute.completedCourses.routerLink;

  protected readonly courseImagePlaceholder = CourseConfig.imagePlaceholder;
  protected readonly emptyConductedCoursesPlaceholder =
    'assets/graphics/empty-conducted-courses.png';
  protected readonly emptyActiveCoursesPlaceholder =
    'assets/graphics/empty-active-courses.png';
  protected readonly emptyAvailableCoursesPlaceholder =
    'assets/graphics/empty-available-courses.png';
  protected readonly emptyCompletedCoursesPlaceholder =
    'assets/graphics/empty-completed-courses.png';

  protected courseMainViewDto?: CourseMainViewDto;

  protected hasTeacherRole!: boolean;

  constructor(
    private readonly loggedInUser: LoggedInUserService,
    private readonly courseApi: CourseApiService,
    private readonly snackBar: ApiErrorSnackBar,
  ) {}

  ngOnInit() {
    this.courseMainViewDtoSubscription = this.courseApi
      .findCourseMainViewDto(3)
      .pipe(
        tap((response) => this.snackBar.openOnFailure(response)),
        map((response) => {
          this.courseMainViewDto = response.content ?? {
            conductedCourses: [],
            activeCourses: [],
            availableCourses: [],
            completedCourses: [],
          };
        }),
      )
      .subscribe();

    this.hasTeacherRole = this.loggedInUser.hasRole(UserRole.teacher);
  }

  ngOnDestroy() {
    this.courseMainViewDtoSubscription?.unsubscribe();
  }
}
