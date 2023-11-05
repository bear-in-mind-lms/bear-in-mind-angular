import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ApiResponse } from '../../../api/api-response';
import { EvaluationApiService } from '../../../api/evaluation/evaluation-api.service';
import { ActiveCoursePageContentComponent } from '../../../course/active/active-course-page-content.component';
import { AvailableCoursePageContentComponent } from '../../../course/available/available-course-page-content.component';
import { CompletedCoursePageContentComponent } from '../../../course/completed/completed-course-page-content.component';
import { ConductedCoursePageContentComponent } from '../../../course/conducted/conducted-course-page-content.component';
import { AppRoute, AppRouteParam } from '../../../routing/app-route';
import { AppBarComponent } from '../../../shared/app-bar/app-bar.component';
import { ConfirmationDialog } from '../../../shared/dialog/confirmation/confirmation-dialog.component';
import { PageContentComponent } from '../../../shared/page/content/page-content.component';
import { injectPathVariables } from '../../../shared/path-utils';
import { QuizDetailsListComponent } from '../details-list/quiz-details-list.component';
import { QuizStatus } from '../quiz-status';
import { QuizViewDto } from '../quiz-view-dto';

@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    MatButtonModule,
    MatDialogModule,
    ActiveCoursePageContentComponent,
    AppBarComponent,
    AvailableCoursePageContentComponent,
    CompletedCoursePageContentComponent,
    ConductedCoursePageContentComponent,
    PageContentComponent,
    QuizDetailsListComponent,
  ],
  templateUrl: './quiz-page.component.html',
})
export class QuizPageComponent implements OnInit, OnDestroy {
  protected readonly QuizStatus = QuizStatus;
  protected readonly previousLocation = AppRoute.courses.routerLink;

  protected quizViewDtoObservable!: Observable<ApiResponse<QuizViewDto>>;
  protected confirmationSubscription?: Subscription;

  private quizId!: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly evaluationApi: EvaluationApiService,
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.quizId = routeParams.get(AppRouteParam.id)!;

    this.quizViewDtoObservable = this.evaluationApi.findQuizViewDtoBy(
      this.quizId,
    );
  }

  ngOnDestroy() {
    this.confirmationSubscription?.unsubscribe();
  }

  protected solve() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: $localize`:@@confirmQuizSolvingTitle:`,
        negativeButtonTitle: $localize`:@@cancel:`,
        positiveButtonTitle: $localize`:@@solve:`,
      },
    });

    this.confirmationSubscription = dialogRef
      .afterClosed()
      .subscribe((result) => {
        if (result !== undefined) {
          this.navigateToSolvingQuiz();
        }
      });
  }

  private navigateToSolvingQuiz() {
    const route = injectPathVariables(AppRoute.solveQuiz.routerLink, {
      [AppRouteParam.id]: this.quizId,
    });
    this.router.navigateByUrl(route);
  }
}
