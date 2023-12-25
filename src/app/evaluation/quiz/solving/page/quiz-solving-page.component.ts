import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { ApiErrorSnackBar } from '../../../../api/api-error-snack-bar/api-error-snack-bar.service';
import { ApiResponse } from '../../../../api/api-response';
import { EvaluationApiService } from '../../../../api/evaluation/evaluation-api.service';
import { AppRoute, AppRouteParam } from '../../../../routing/app-route';
import { AppBarComponent } from '../../../../shared/app-bar/app-bar.component';
import { BottomNavigationDirective } from '../../../../shared/bottom-navigation/bottom-navigation.directive';
import { CanDeactivateComponent } from '../../../../shared/can-deactivate-component.guard';
import { convertMapToIndexSignature } from '../../../../shared/collection-utils';
import { ConfirmationDialog } from '../../../../shared/dialog/confirmation/confirmation-dialog.component';
import { PageContentComponent } from '../../../../shared/page/content/page-content.component';
import { injectPathVariables } from '../../../../shared/path-utils';
import { format } from '../../../../shared/string-utils';
import { EvaluationConfig } from '../../../evaluation-config';
import { FieldType } from '../../../form/section/field/field-type';
import { SectionFieldComponent } from '../../../form/section/field/section-field.component';
import { QuizSolvingViewDto } from '../quiz-solving-view-dto';

@Component({
  selector: 'app-quiz-solving-page',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    MatButtonModule,
    MatTabsModule,
    MatTooltipModule,
    MatDialogModule,
    BottomNavigationDirective,
    AppBarComponent,
    PageContentComponent,
    SectionFieldComponent,
  ],
  templateUrl: './quiz-solving-page.component.html',
  styleUrls: ['./quiz-solving-page.component.scss'],
})
export class QuizSolvingPageComponent
  implements OnInit, OnDestroy, CanDeactivateComponent
{
  private quizId!: string;
  private isSubmitted = false;

  private readonly subscriptions: Subscription[] = [];

  private readonly fieldIdFormControlsMap = new Map<
    string,
    [string, FormControl<string | boolean | null>][]
  >();
  protected questionsLeft = 0;
  protected questionsLeftMessage = '';

  protected quizSolvingViewDtoObservable!: Observable<
    ApiResponse<QuizSolvingViewDto>
  >;

  protected selectedSectionIndex = 0;
  protected isSubmitting = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly evaluationApi: EvaluationApiService,
    private readonly dialog: MatDialog,
    private readonly snackBar: ApiErrorSnackBar,
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.quizId = routeParams.get(AppRouteParam.id)!;

    this.quizSolvingViewDtoObservable = this.evaluationApi
      .findQuizSolvingViewDtoBy(this.quizId)
      .pipe(tap(this.initFormControls), tap(this.countAndUpdateQuestionsLeft));
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  getDeactivationMessage() {
    return this.isSubmitted
      ? undefined
      : $localize`:@@quizSolvingPageDeactivationMessage:`;
  }

  @HostListener('window:beforeunload')
  protected onBeforeUnload() {
    return this.getDeactivationMessage() === undefined;
  }

  protected onSelectedIndexChange(index: number) {
    this.selectedSectionIndex = index;
  }

  protected getFieldFormControls(fieldId: string) {
    return this.fieldIdFormControlsMap
      .get(fieldId)!
      .map(([, formControl]) => formControl);
  }

  protected submit() {
    this.isSubmitting = true;

    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: $localize`:@@confirmAnswersSubmissionTitle:`,
        content:
          this.questionsLeft === 0
            ? $localize`:@@confirmAnswersSubmissionContent:`
            : $localize`:@@confirmAnswersSubmissionContentUnfinished:`,
        negativeButtonTitle: $localize`:@@cancel:`,
        positiveButtonTitle: $localize`:@@submit:`,
      },
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((result) => {
        if (result !== undefined) {
          this.sendAnswers();
        } else {
          this.isSubmitting = false;
        }
      }),
    );
  }

  private sendAnswers() {
    this.subscriptions.push(
      this.evaluationApi
        .sendAnswers(this.quizId, this.createQuizAnswersDto())
        .subscribe((response) => {
          if (response.isSuccess()) {
            this.isSubmitted = true;
            this.router.navigateByUrl(
              injectPathVariables(AppRoute.quiz.routerLink, {
                [AppRouteParam.id]: this.quizId,
              }),
              {
                replaceUrl: true,
              },
            );
          } else {
            this.snackBar.open(response.error!);
          }

          this.isSubmitting = false;
        }),
    );
  }

  private readonly initFormControls = (
    response: ApiResponse<QuizSolvingViewDto>,
  ) => {
    if (response.isSuccess()) {
      for (const section of response.content!.sections) {
        for (const field of section.fields) {
          if (field.fieldType === FieldType.checkbox) {
            this.fieldIdFormControlsMap.set(
              field.id,
              field.options!.map((option) => [
                option,
                this.createFormControl(false),
              ]),
            );
          } else {
            this.fieldIdFormControlsMap.set(field.id, [
              ['', this.createFormControl('')],
            ]);
          }
        }
      }
    }
  };

  private createFormControl<T>(initialValue: T) {
    const formControl = new FormControl(initialValue);
    this.subscriptions.push(
      formControl.valueChanges.subscribe(this.countAndUpdateQuestionsLeft),
    );
    return formControl;
  }

  private readonly countAndUpdateQuestionsLeft = () => {
    const questionsLeft = [...this.fieldIdFormControlsMap.values()].reduce(
      (previousValue, currentValue) => {
        const formControls = currentValue.map((value) => value[1]);
        return previousValue + (this.isSectionFieldEmpty(formControls) ? 1 : 0);
      },
      0,
    );

    this.updateQuestionsLeft(questionsLeft);
  };

  private isSectionFieldEmpty(fieldFormControls: FormControl[]) {
    const firstFormControl = fieldFormControls[0];
    if (typeof firstFormControl.value === 'boolean') {
      return fieldFormControls.every(
        (formControl) => formControl.value === false,
      );
    } else {
      return (
        firstFormControl.value === null || `${firstFormControl.value}` === ''
      );
    }
  }

  private updateQuestionsLeft(questionsLeft: number) {
    if (questionsLeft !== this.questionsLeft) {
      this.questionsLeft = questionsLeft;
      this.questionsLeftMessage =
        questionsLeft === 0
          ? ''
          : format($localize`:@@questionsLeft_format:`, questionsLeft);
    }
  }

  private createQuizAnswersDto() {
    const answers = new Map(
      [...this.fieldIdFormControlsMap.entries()].map(
        ([fieldId, formControls]) => [
          fieldId,
          this.extractAnswerFromFormControls(formControls),
        ],
      ),
    );
    return {
      answers: convertMapToIndexSignature(answers),
    };
  }

  private extractAnswerFromFormControls(formControls: [string, FormControl][]) {
    return formControls
      .flatMap(([label, formControl]) => {
        if (formControl.value === null || formControl.value === false) {
          return [];
        } else if (formControl.value === true) {
          return label;
        } else {
          return formControl.value;
        }
      })
      .join(EvaluationConfig.answerOptionSeparator);
  }
}
