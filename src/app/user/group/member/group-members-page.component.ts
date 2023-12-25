import { Component } from '@angular/core';
import { map } from 'rxjs';
import { UserApiService } from '../../../api/user/user-api.service';
import { AppRoute } from '../../../routing/app-route';
import { AppBarComponent } from '../../../shared/app-bar/app-bar.component';
import { InfiniteScrollListComponent } from '../../../shared/infinite-scroll-list/infinite-scroll-list.component';
import { PageContentComponent } from '../../../shared/page/content/page-content.component';
import { UserConfig } from '../../user-config';

@Component({
  selector: 'app-group-members-page',
  standalone: true,
  imports: [AppBarComponent, PageContentComponent, InfiniteScrollListComponent],
  templateUrl: './group-members-page.component.html',
})
export class GroupMembersPageComponent {
  protected readonly previousLocation = AppRoute.users.routerLink;
  protected readonly userRoute = AppRoute.user.routerLink;

  constructor(private readonly userApi: UserApiService) {}

  protected readonly fetchPage = (page: number) => {
    return this.userApi
      .findGroupMemberPage({
        pageNumber: page,
        pageSize: UserConfig.defaultPageSize,
      })
      .pipe(map((response) => response.content!));
  };
}
