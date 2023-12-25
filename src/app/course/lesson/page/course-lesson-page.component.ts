import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../api/api-response';
import { CourseLessonApiService } from '../../../api/course/course-lesson-api.service';
import { EvaluationApiService } from '../../../api/evaluation/evaluation-api.service';
import { QuizListItemComponent } from '../../../evaluation/quiz/list-item/quiz-list-item.component';
import { QuizListItemDto } from '../../../evaluation/quiz/quiz-list-item-dto';
import { AppRoute, AppRouteParam } from '../../../routing/app-route';
import { AppBarComponent } from '../../../shared/app-bar/app-bar.component';
import { PageContentComponent } from '../../../shared/page/content/page-content.component';
import { PageSectionComponent } from '../../../shared/page/section/page-section.component';
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
    PageSectionComponent,
    QuizListItemComponent,
  ],
  templateUrl: './course-lesson-page.component.html',
  styleUrls: ['./course-lesson-page.component.scss'],
})
export class CourseLessonPageComponent implements OnInit {
  protected readonly previousLocation = AppRoute.courses.routerLink;

  protected courseLessonId!: number;

  protected courseLessonViewDtoObservable!: Observable<
    ApiResponse<CourseLessonViewDto>
  >;

  protected courseLessonQuizzesDtoObservable!: Observable<
    ApiResponse<QuizListItemDto[]>
  >;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseLessonApi: CourseLessonApiService,
    private readonly evaluationApi: EvaluationApiService,
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.courseLessonId = Number(routeParams.get(AppRouteParam.id));

    this.courseLessonViewDtoObservable =
      this.courseLessonApi.findCourseLessonViewDtoBy(this.courseLessonId);

    this.courseLessonQuizzesDtoObservable =
      this.evaluationApi.findAllCourseLessonQuizBy(this.courseLessonId);
  }
}
