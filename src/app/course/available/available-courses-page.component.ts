import { Component } from '@angular/core';
import { map } from 'rxjs';
import { CourseApiService } from '../../api/course/course-api.service';
import { AppRoute } from '../../routing/app-route';
import { AppBarComponent } from '../../shared/app-bar/app-bar.component';
import { InfiniteScrollListComponent } from '../../shared/infinite-scroll-list/infinite-scroll-list.component';
import { PageContentComponent } from '../../shared/page/content/page-content.component';
import { CourseConfig } from '../course-config';

@Component({
  selector: 'app-available-courses-page',
  standalone: true,
  imports: [AppBarComponent, PageContentComponent, InfiniteScrollListComponent],
  templateUrl: './available-courses-page.component.html',
})
export class AvailableCoursesPageComponent {
  protected readonly previousLocation = AppRoute.courses.routerLink;
  protected readonly courseRoute = AppRoute.course.routerLink;
  protected readonly courseImagePlaceholder = CourseConfig.imagePlaceholder;

  constructor(private readonly courseApi: CourseApiService) {}

  protected readonly fetchPage = (page: number) => {
    return this.courseApi
      .findAvailableCoursePage({
        pageNumber: page,
        pageSize: CourseConfig.defaultPageSize,
      })
      .pipe(map((response) => response.content!));
  };
}
