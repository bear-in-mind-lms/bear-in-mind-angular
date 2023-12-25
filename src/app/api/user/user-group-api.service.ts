import { Injectable } from '@angular/core';
import { CreateOrUpdateUserGroupDto } from '../../user/group/creator/create-or-update-user-group-dto';
import { UserGroupDto } from '../../user/group/user-group-dto';
import { UserGroupListItemDto } from '../../user/group/user-group-list-item-dto';
import { ApiService } from '../api-service';
import { Page } from '../page';
import { Pagination } from '../pagination';

function path(path: string) {
  return `/user/group${path}`;
}

@Injectable({
  providedIn: 'root',
})
export class UserGroupApiService {
  constructor(private readonly api: ApiService) {}

  createUserGroup(dto: CreateOrUpdateUserGroupDto) {
    return this.api.post<number>({ path: path('') }, dto);
  }

  findUserGroupDtoBy(id: number) {
    return this.api.get<UserGroupDto>({
      path: path('/:id'),
      pathVariables: { id },
    });
  }

  findRegisteredUserGroupPage(pagination: Pagination) {
    return this.api.get<Page<UserGroupListItemDto>>({
      path: path('/list/registered'),
      params: pagination,
    });
  }

  findAvailableUserGroupPage(pagination: Pagination) {
    return this.api.get<Page<UserGroupListItemDto>>({
      path: path('/list/available'),
      params: pagination,
    });
  }

  join(groupId: number) {
    return this.api.post({
      path: path('/join/:groupId'),
      pathVariables: { groupId },
    });
  }
}
