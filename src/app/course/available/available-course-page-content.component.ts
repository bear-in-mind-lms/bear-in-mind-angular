import { NgForOf } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiErrorSnackBar } from '../../api/api-error-snack-bar/api-error-snack-bar.service';
import { CourseApiService } from '../../api/course/course-api.service';
import { reloadPage } from '../../shared/router-utils';
import { CourseViewDto } from '../course-view-dto';
import { CourseDetailsListComponent } from '../details/list/course-details-list.component';
import { CourseLessonCardComponent } from '../lesson/card/course-lesson-card.component';

@Component({
  selector: 'app-available-course-page-content',
  standalone: true,
  imports: [
    NgForOf,
    MatButtonModule,
    MatIconModule,
    CourseDetailsListComponent,
    CourseLessonCardComponent,
  ],
  templateUrl: './available-course-page-content.component.html',
})
export class AvailableCoursePageContentComponent implements OnDestroy {
  enrollSubscription?: Subscription;

  @Input({ required: true }) courseId!: number;
  @Input({ required: true }) course!: CourseViewDto;

  constructor(
    private readonly router: Router,
    private readonly courseApi: CourseApiService,
    private readonly snackBar: ApiErrorSnackBar,
  ) {}

  ngOnDestroy() {
    this.enrollSubscription?.unsubscribe();
  }

  enrollInCourse() {
    this.enrollSubscription = this.courseApi
      .enrollUserInCourse(this.courseId)
      .subscribe((response) => {
        if (response.isSuccess()) {
          reloadPage(this.router);
        } else {
          this.snackBar.open(response.error!);
        }
      });
  }
}
