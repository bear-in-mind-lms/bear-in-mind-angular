import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { AppRoute, AppRouteParam } from '../../../routing/app-route';
import { injectPathVariables } from '../../../shared/path-utils';
import { TextAvatarComponent } from '../../../shared/text-avatar/text-avatar.component';
import { CourseLessonListItemDto } from '../course-lesson-list-item-dto';

@Component({
  selector: 'app-course-lesson-card',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatRippleModule,
    MatTooltipModule,
    TextAvatarComponent,
  ],
  templateUrl: './course-lesson-card.component.html',
  styleUrls: ['./course-lesson-card.component.scss'],
})
export class CourseLessonCardComponent implements OnInit {
  @Input({ required: true }) lesson!: CourseLessonListItemDto;

  protected isDisabled = false;

  @Input()
  get disabled() {
    return this.isDisabled;
  }

  set disabled(value: BooleanInput) {
    this.isDisabled = coerceBooleanProperty(value);
  }

  protected itemRoute?: string;
  protected isTooltipDisabled!: boolean;

  ngOnInit() {
    if (!this.isDisabled) {
      this.itemRoute = injectPathVariables(AppRoute.courseLesson.routerLink, {
        [AppRouteParam.id]: this.lesson.id,
      });
    }

    this.isTooltipDisabled = this.lesson.topic.length < 40;
  }
}
