import { Component } from '@angular/core';
import { map } from 'rxjs';
import { UserApiService } from '../../api/user/user-api.service';
import { AppRoute } from '../../routing/app-route';
import { AppBarComponent } from '../../shared/app-bar/app-bar.component';
import { InfiniteScrollListComponent } from '../../shared/infinite-scroll-list/infinite-scroll-list.component';
import { PageContentComponent } from '../../shared/page/content/page-content.component';
import { UserConfig } from '../user-config';

@Component({
  selector: 'app-students-page',
  standalone: true,
  imports: [AppBarComponent, PageContentComponent, InfiniteScrollListComponent],
  templateUrl: './students-page.component.html',
})
export class StudentsPageComponent {
  protected readonly previousLocation = AppRoute.users.routerLink;
  protected readonly userRoute = AppRoute.user.routerLink;

  constructor(private readonly userApi: UserApiService) {}

  protected readonly fetchPage = (page: number) => {
    return this.userApi
      .findStudentPage({
        pageNumber: page,
        pageSize: UserConfig.defaultPageSize,
      })
      .pipe(map((response) => response.content!));
  };
}
