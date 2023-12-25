import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../api/api-response';
import { CourseApiService } from '../../api/course/course-api.service';
import { AppRoute, AppRouteParam } from '../../routing/app-route';
import { AppBarComponent } from '../../shared/app-bar/app-bar.component';
import { PageContentComponent } from '../../shared/page/content/page-content.component';
import { ActiveCoursePageContentComponent } from '../active/active-course-page-content.component';
import { AvailableCoursePageContentComponent } from '../available/available-course-page-content.component';
import { CompletedCoursePageContentComponent } from '../completed/completed-course-page-content.component';
import { ConductedCoursePageContentComponent } from '../conducted/conducted-course-page-content.component';
import { CourseConfig } from '../course-config';
import { CourseViewDto } from '../course-view-dto';

@Component({
  selector: 'app-course-page',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    AppBarComponent,
    PageContentComponent,
    ActiveCoursePageContentComponent,
    AvailableCoursePageContentComponent,
    CompletedCoursePageContentComponent,
    ConductedCoursePageContentComponent,
  ],
  templateUrl: './course-page.component.html',
})
export class CoursePageComponent implements OnInit {
  protected readonly previousLocation = AppRoute.courses.routerLink;
  protected readonly courseImagePlaceholder = CourseConfig.imagePlaceholder;

  protected courseId!: number;
  protected courseViewDtoObservable!: Observable<ApiResponse<CourseViewDto>>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseApi: CourseApiService,
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.courseId = Number(routeParams.get(AppRouteParam.id));

    this.courseViewDtoObservable = this.courseApi.findCourseViewDtoBy(
      this.courseId,
    );
  }
}
