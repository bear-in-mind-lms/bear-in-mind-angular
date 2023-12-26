import { NgForOf } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiErrorSnackBar } from '../../api/api-error-snack-bar/api-error-snack-bar.service';
import { CourseApiService } from '../../api/course/course-api.service';
import { ConfirmationDialog } from '../../shared/dialog/confirmation/confirmation-dialog.component';
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
    MatDialogModule,
    CourseDetailsListComponent,
    CourseLessonCardComponent,
  ],
  templateUrl: './available-course-page-content.component.html',
})
export class AvailableCoursePageContentComponent implements OnDestroy {
  private readonly subscriptions: Subscription[] = [];

  @Input({ required: true }) courseId!: number;
  @Input({ required: true }) course!: CourseViewDto;

  constructor(
    private readonly router: Router,
    private readonly courseApi: CourseApiService,
    private readonly dialog: MatDialog,
    private readonly snackBar: ApiErrorSnackBar,
  ) {}

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  protected enroll() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: $localize`:@@confirmCourseEnrolmentTitle:`,
        negativeButtonTitle: $localize`:@@cancel:`,
        positiveButtonTitle: $localize`:@@enroll:`,
      },
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((result) => {
        if (result !== undefined) {
          this.sendEnrollInCourseRequest();
        }
      }),
    );
  }

  protected isEnrolling() {
    return this.subscriptions.some((subscription) => !subscription.closed);
  }

  private sendEnrollInCourseRequest() {
    this.subscriptions.push(
      this.courseApi.enrollUserInCourse(this.courseId).subscribe((response) => {
        if (response.isSuccess()) {
          reloadPage(this.router);
        } else {
          this.snackBar.open(response.error!);
        }
      }),
    );
  }
}
