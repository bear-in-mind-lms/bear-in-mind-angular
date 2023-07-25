import { Component } from '@angular/core';
import { map } from 'rxjs';
import { UserGroupApiService } from '../../../api/user/user-group-api.service';
import { AppRoute } from '../../../routing/app-route';
import { AppBarComponent } from '../../../shared/app-bar/app-bar.component';
import { InfiniteScrollListComponent } from '../../../shared/infinite-scroll-list/infinite-scroll-list.component';
import { PageContentComponent } from '../../../shared/page/content/page-content.component';
import { UserConfig } from '../../user-config';

@Component({
  selector: 'app-available-courses-page',
  standalone: true,
  imports: [AppBarComponent, PageContentComponent, InfiniteScrollListComponent],
  templateUrl: './available-user-groups-page.component.html',
})
export class AvailableUserGroupsPageComponent {
  readonly previousLocation = AppRoute.users.routerLink;
  readonly userGroupRoute = AppRoute.userGroup.routerLink;
  readonly userGroupImagePlaceholder = UserConfig.imagePlaceholder;

  constructor(private readonly userGroupApi: UserGroupApiService) {}

  readonly fetchPage = (page: number) => {
    return this.userGroupApi
      .findAvailableUserGroupPage({
        pageNumber: page,
        pageSize: UserConfig.defaultPageSize,
      })
      .pipe(map((response) => response.content!));
  };
}
