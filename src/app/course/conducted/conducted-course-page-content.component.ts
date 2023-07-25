import { NgForOf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CourseViewDto } from '../course-view-dto';
import { CourseDetailsAccordionComponent } from '../details/accordion/course-details-accordion.component';
import { CourseLessonCardComponent } from '../lesson/card/course-lesson-card.component';

@Component({
  selector: 'app-conducted-course-page-content',
  standalone: true,
  imports: [
    NgForOf,
    CourseDetailsAccordionComponent,
    CourseLessonCardComponent,
  ],
  templateUrl: './conducted-course-page-content.component.html',
})
export class ConductedCoursePageContentComponent {
  @Input({ required: true }) course!: CourseViewDto;
}
