import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { ApiErrorSnackBar } from '../../../../api/api-error-snack-bar/api-error-snack-bar.service';
import { ApiResponse } from '../../../../api/api-response';
import { EvaluationApiService } from '../../../../api/evaluation/evaluation-api.service';
import { AppRoute, AppRouteParam } from '../../../../routing/app-route';
import { AppBarComponent } from '../../../../shared/app-bar/app-bar.component';
import { convertMapToIndexSignature } from '../../../../shared/collection-utils';
import { ConfirmationDialog } from '../../../../shared/dialog/confirmation/confirmation-dialog.component';
import { PageContentComponent } from '../../../../shared/page/content/page-content.component';
import { injectPathVariables } from '../../../../shared/path-utils';
import { QuizGradeDto } from '../../quiz-grade-dto';
import { QuizAnswersViewDto } from '../quiz-answers-view-dto';

@Component({
  selector: 'app-quiz-answers-page',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    AsyncPipe,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    AppBarComponent,
    PageContentComponent,
  ],
  templateUrl: './quiz-answers-page.component.html',
  styleUrls: ['./quiz-answers-page.component.scss'],
})
export class QuizAnswersPageComponent implements OnInit, OnDestroy {
  private quizId!: string;
  private userId!: number;

  private grades: QuizGradeDto[] = [];
  private courseLessonId!: number;
  private initialPoints = 0;

  private readonly subscriptions: Subscription[] = [];

  protected readonly previousLocation = AppRoute.courses.routerLink;
  protected readonly noAnswerText = $localize`:@@noAnswer:`;

  protected evaluateSubscription?: Subscription;

  protected isEvaluated = false;
  protected isEvaluating = true;
  protected points = 0;
  protected maxPoints = 0;
  protected gradeName = '';
  protected passed = false;

  protected readonly fieldIdFormControlMap = new Map<
    string,
    FormControl<string | null>
  >();

  protected quizAnswersViewDtoObservable!: Observable<
    ApiResponse<QuizAnswersViewDto>
  >;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly evaluationApi: EvaluationApiService,
    private readonly dialog: MatDialog,
    private readonly snackBar: ApiErrorSnackBar,
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.quizId = routeParams.get(AppRouteParam.quizId)!;
    this.userId = Number(routeParams.get(AppRouteParam.userId)!);
    this.courseLessonId = Number(
      routeParams.get(AppRouteParam.courseLessonId)!,
    );

    this.quizAnswersViewDtoObservable = this.evaluationApi
      .findQuizAnswersViewDtoByQuizIdAndUserId(this.quizId, this.userId)
      .pipe(tap(this.initFormControlsAndData));
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  protected evaluate() {
    this.isEvaluating = true;

    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: $localize`:@@confirmQuizEvaluationTitle:`,
        negativeButtonTitle: $localize`:@@cancel:`,
        positiveButtonTitle: $localize`:@@evaluate:`,
      },
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((result) => {
        if (result !== undefined) {
          this.sendEvaluateRequest();
        } else {
          this.isEvaluating = false;
        }
      }),
    );
  }

  private sendEvaluateRequest() {
    this.evaluateSubscription = this.evaluationApi
      .evaluate(this.quizId, this.userId, this.createQuizEvaluationDto())
      .subscribe((response) => {
        if (response.isSuccess()) {
          this.router.navigateByUrl(
            injectPathVariables(AppRoute.courseLesson.routerLink, {
              [AppRouteParam.id]: this.courseLessonId,
            }),
            {
              replaceUrl: true,
            },
          );
        } else {
          this.snackBar.open(response.error!);
        }

        this.isEvaluating = false;
      });
    this.subscriptions.push(this.evaluateSubscription);
  }

  private readonly initFormControlsAndData = (
    response: ApiResponse<QuizAnswersViewDto>,
  ) => {
    if (response.isSuccess()) {
      const content = response.content!;
      this.grades = content.grades.sort(
        (a, b) => b.minimumPercentage - a.minimumPercentage,
      );

      for (const answer of content.answers) {
        this.maxPoints += answer.maxPoints;

        if (answer.points === undefined) {
          this.fieldIdFormControlMap.set(answer.id, this.createFormControl());
        } else {
          this.initialPoints += answer.points.value;
        }
      }

      this.updatePointsAndGrade();
      if (this.fieldIdFormControlMap.size === 0) {
        this.isEvaluated = true;
      }
    }
  };

  private createFormControl() {
    const formControl = new FormControl('', {
      validators: Validators.required,
    });
    this.subscriptions.push(
      formControl.valueChanges.subscribe(this.updatePointsAndGrade),
    );
    return formControl;
  }

  private readonly updatePointsAndGrade = () => {
    this.isEvaluating = [...this.fieldIdFormControlMap.values()].some(
      (formControl) => !formControl.valid,
    );

    this.points = this.countPoints();
    const grade = this.getGrade(this.points);
    this.gradeName = grade?.name ?? '';
    this.passed = grade?.passed ?? false;
  };

  private countPoints() {
    return (
      this.initialPoints +
      [...this.fieldIdFormControlMap.values()].reduce(
        (previousValue, currentValue) =>
          previousValue + Number(currentValue.value),
        0,
      )
    );
  }

  private getGrade(points: number) {
    const percentageResult = points / this.maxPoints;
    return this.grades.find(
      (grade) => percentageResult >= grade.minimumPercentage,
    );
  }

  private createQuizEvaluationDto() {
    const points = new Map(
      [...this.fieldIdFormControlMap.entries()].map(
        ([fieldId, formControl]) => [fieldId, Number(formControl.value)],
      ),
    );
    return {
      evaluation: convertMapToIndexSignature(points),
    };
  }
}
