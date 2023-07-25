import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CourseViewDto } from '../../course-view-dto';
import { CourseDetailsListComponent } from '../list/course-details-list.component';

@Component({
  selector: 'app-course-details-accordion',
  standalone: true,
  imports: [MatExpansionModule, CourseDetailsListComponent],
  templateUrl: './course-details-accordion.component.html',
})
export class CourseDetailsAccordionComponent {
  @Input({ required: true }) course!: CourseViewDto;
}
