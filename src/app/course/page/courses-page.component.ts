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
  ],
  templateUrl: './courses-page.component.html',
})
export class CoursesPageComponent implements OnInit, OnDestroy {
  readonly courseRoute = AppRoute.course.routerLink;
  readonly createCourseRoute = AppRoute.createCourse.routerLink;

  readonly conductedCoursesRoute = AppRoute.conductedCourses.routerLink;
  readonly activeCoursesRoute = AppRoute.activeCourses.routerLink;
  readonly availableCoursesRoute = AppRoute.availableCourses.routerLink;
  readonly completedCoursesRoute = AppRoute.completedCourses.routerLink;

  readonly courseImagePlaceholder = CourseConfig.imagePlaceholder;
  readonly emptyConductedCoursesPlaceholder =
    'assets/graphics/empty-conducted-courses.png';
  readonly emptyActiveCoursesPlaceholder =
    'assets/graphics/empty-active-courses.png';
  readonly emptyAvailableCoursesPlaceholder =
    'assets/graphics/empty-available-courses.png';
  readonly emptyCompletedCoursesPlaceholder =
    'assets/graphics/empty-completed-courses.png';

  courseMainViewDtoSubscription!: Subscription;
  courseMainViewDto?: CourseMainViewDto;

  hasTeacherRole!: boolean;

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
    this.courseMainViewDtoSubscription.unsubscribe();
  }
}
