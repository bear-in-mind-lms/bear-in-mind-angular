import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { AppRoute, AppRouteParam } from '../../routing/app-route';
import { injectPathVariables } from '../../shared/path-utils';
import { InitialsPipe } from '../../shared/pipe/initials.pipe';
import { TextAvatarComponent } from '../../shared/text-avatar/text-avatar.component';
import { UserListItemDto } from '../user-list-item-dto';

@Component({
  selector: 'app-user-chip-list',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgOptimizedImage,
    RouterLink,
    MatChipsModule,
    TextAvatarComponent,
    InitialsPipe,
  ],
  templateUrl: './user-chip-list.component.html',
})
export class UserChipListComponent {
  @Input({ required: true }) users!: UserListItemDto[];

  getRouterLink(userId: number) {
    return injectPathVariables(AppRoute.user.routerLink, {
      [AppRouteParam.id]: userId,
    });
  }
}
