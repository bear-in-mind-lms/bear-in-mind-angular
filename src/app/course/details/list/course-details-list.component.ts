import { DatePipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { UserChipListComponent } from '../../../user/chip/list/user-chip-list.component';
import { CourseViewDto } from '../../course-view-dto';

@Component({
  selector: 'app-course-details-list',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    MatListModule,
    MatIconModule,
    UserChipListComponent,
  ],
  templateUrl: './course-details-list.component.html',
})
export class CourseDetailsListComponent {
  @Input({ required: true }) course!: CourseViewDto;
}
