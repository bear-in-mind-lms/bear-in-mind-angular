import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Moment } from 'moment';
import { Subscription } from 'rxjs';
import { LocaleConfig } from '../../../../locale/locale-config';
import { ApiErrorSnackBar } from '../../../api/api-error-snack-bar/api-error-snack-bar.service';
import { CourseApiService } from '../../../api/course/course-api.service';
import { AppRoute, AppRouteParam } from '../../../routing/app-route';
import { DateTimeFormFieldComponent } from '../../../shared/date-time-form-field/date-time-form-field.component';
import { injectPathVariables } from '../../../shared/path-utils';
import { convertLocaleFieldTextsMapToIndexSignature } from '../../../shared/translation-utils';
import { TranslationsFormFieldComponent } from '../../../shared/translations-form-field/translations-form-field.component';
import { CreateCourseDto, TranslationField } from '../create-course-dto';

const DEFAULT_TIME = '8:00';

function createIsoDateTimeStringFromControls(
  dateControl: FormControl<Moment | null>,
  timeControl: FormControl<string | null>,
) {
  const date = dateControl.value;
  if (date === null) {
    return undefined;
  }

  const time = timeControl.value ?? DEFAULT_TIME;
  const [hour, minute] = time.split(':', 2);

  return date
    .set('hour', parseInt(hour))
    .set('minute', parseInt(minute))
    .toISOString();
}

@Component({
  selector: 'app-course-creator-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    TranslationsFormFieldComponent,
    DateTimeFormFieldComponent,
  ],
  templateUrl: './course-creator-form.component.html',
  styleUrls: ['./course-creator-form.component.scss'],
})
export class CourseCreatorFormComponent {
  readonly translationFieldLabelMap = new Map<TranslationField, string>([
    ['name', $localize`:@@name:`],
    ['description', $localize`:@@description:`],
  ]);

  readonly courseForm = new FormGroup({
    translations: new FormControl<Map<string, Map<TranslationField, string>>>(
      new Map([[LocaleConfig.serverLocale, new Map()]]),
    ),
    startDate: new FormControl<Moment | null>(null),
    startTime: new FormControl<string>(DEFAULT_TIME),
    endDate: new FormControl<Moment | null>(null),
    endTime: new FormControl<string>(DEFAULT_TIME),
    registrationClosingDate: new FormControl<Moment | null>(null),
    registrationClosingTime: new FormControl<string>(DEFAULT_TIME),
  });

  createCourseSubscription?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly courseApi: CourseApiService,
    private readonly snackBar: ApiErrorSnackBar,
  ) {}

  publish() {
    this.createCourseSubscription = this.courseApi
      .createCourse(this.createCourseDto())
      .subscribe((response) => {
        if (response.isSuccess()) {
          this.router.navigateByUrl(
            injectPathVariables(AppRoute.course.routerLink, {
              [AppRouteParam.id]: response.content!,
            }),
            {
              replaceUrl: true,
            },
          );
        } else {
          this.snackBar.open(response.error!);
        }
      });
  }

  private createCourseDto(): CreateCourseDto {
    const controls = this.courseForm.controls;

    return {
      translations: convertLocaleFieldTextsMapToIndexSignature(
        controls.translations.value!,
      ),
      startDateTime: createIsoDateTimeStringFromControls(
        controls.startDate,
        controls.startTime,
      ),
      endDateTime: createIsoDateTimeStringFromControls(
        controls.endDate,
        controls.endTime,
      ),
      registrationClosingDateTime: createIsoDateTimeStringFromControls(
        controls.registrationClosingDate,
        controls.registrationClosingTime,
      ),
    };
  }
}
