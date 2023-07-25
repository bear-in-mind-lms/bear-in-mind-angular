import { Component } from '@angular/core';
import { AppRoute } from '../../../../routing/app-route';
import { AppBarComponent } from '../../../../shared/app-bar/app-bar.component';
import { PageContentComponent } from '../../../../shared/page/content/page-content.component';
import { UserGroupCreatorFormComponent } from '../form/user-group-creator-form.component';

@Component({
  selector: 'app-user-group-creator-page',
  standalone: true,
  imports: [
    AppBarComponent,
    PageContentComponent,
    UserGroupCreatorFormComponent,
  ],
  templateUrl: './user-group-creator-page.component.html',
})
export class UserGroupCreatorPageComponent {
  readonly previousLocation = AppRoute.users.routerLink;
}
