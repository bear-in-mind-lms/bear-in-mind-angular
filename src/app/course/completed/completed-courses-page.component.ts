import { Component } from '@angular/core';
import { map } from 'rxjs';
import { CourseApiService } from '../../api/course/course-api.service';
import { AppRoute } from '../../routing/app-route';
import { AppBarComponent } from '../../shared/app-bar/app-bar.component';
import { InfiniteScrollListComponent } from '../../shared/infinite-scroll-list/infinite-scroll-list.component';
import { PageContentComponent } from '../../shared/page/content/page-content.component';
import { CourseConfig } from '../course-config';

@Component({
  selector: 'app-completed-courses-page',
  standalone: true,
  imports: [AppBarComponent, PageContentComponent, InfiniteScrollListComponent],
  templateUrl: './completed-courses-page.component.html',
})
export class CompletedCoursesPageComponent {
  readonly previousLocation = AppRoute.courses.routerLink;
  readonly courseRoute = AppRoute.course.routerLink;
  readonly courseImagePlaceholder = CourseConfig.imagePlaceholder;

  constructor(private readonly courseApi: CourseApiService) {}

  readonly fetchPage = (page: number) => {
    return this.courseApi
      .findCompletedCoursePage({
        pageNumber: page,
        pageSize: CourseConfig.defaultPageSize,
      })
      .pipe(map((response) => response.content!));
  };
}
