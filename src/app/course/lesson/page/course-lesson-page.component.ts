import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../api/api-response';
import { CourseLessonApiService } from '../../../api/course/course-lesson-api.service';
import { AppRoute, AppRouteParam } from '../../../routing/app-route';
import { AppBarComponent } from '../../../shared/app-bar/app-bar.component';
import { PageContentComponent } from '../../../shared/page/content/page-content.component';
import { CourseLessonViewDto } from '../course-lesson-view-dto';
import { CourseLessonPartComponent } from '../part/course-lesson-part.component';

@Component({
  selector: 'app-course-lesson-page',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    MatListModule,
    MatIconModule,
    PageContentComponent,
    AppBarComponent,
    CourseLessonPartComponent,
  ],
  templateUrl: './course-lesson-page.component.html',
  styleUrls: ['./course-lesson-page.component.scss'],
})
export class CourseLessonPageComponent implements OnInit {
  readonly previousLocation = AppRoute.courses.routerLink;

  courseLessonId!: number;
  courseLessonViewDtoObservable!: Observable<ApiResponse<CourseLessonViewDto>>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseLessonApi: CourseLessonApiService,
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.courseLessonId = Number(routeParams.get(AppRouteParam.id));

    this.courseLessonViewDtoObservable =
      this.courseLessonApi.findCourseLessonViewDtoBy(this.courseLessonId);
  }
}
