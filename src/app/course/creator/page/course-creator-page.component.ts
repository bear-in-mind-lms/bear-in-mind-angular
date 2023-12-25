import { Component } from '@angular/core';
import { AppRoute } from '../../../routing/app-route';
import { AppBarComponent } from '../../../shared/app-bar/app-bar.component';
import { PageContentComponent } from '../../../shared/page/content/page-content.component';
import { CourseCreatorFormComponent } from '../form/course-creator-form.component';

@Component({
  selector: 'app-course-creator-page',
  standalone: true,
  imports: [PageContentComponent, AppBarComponent, CourseCreatorFormComponent],
  templateUrl: './course-creator-page.component.html',
})
export class CourseCreatorPageComponent {
  protected readonly previousLocation = AppRoute.courses.routerLink;
}
