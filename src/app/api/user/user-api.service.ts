import { Injectable } from '@angular/core';
import { UserListItemDto } from '../../user/user-list-item-dto';
import { UserMainViewDto } from '../../user/user-main-view-dto';
import { UserViewDto } from '../../user/user-view-dto';
import { ApiService } from '../api-service';
import { Page } from '../page';
import { Pagination } from '../pagination';

function path(path: string) {
  return `/user${path}`;
}

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private readonly api: ApiService) {}

  findUserViewDtoBy(id: number) {
    return this.api.get<UserViewDto>({
      path: path('/:id'),
      pathVariables: { id },
    });
  }

  findUserMainViewDto(listLength: number) {
    return this.api.get<UserMainViewDto>({
      path: path('/main-view'),
      params: { listLength },
    });
  }

  findGroupMemberPage(pagination: Pagination) {
    return this.api.get<Page<UserListItemDto>>({
      path: path('/list/group-members'),
      params: pagination,
    });
  }

  findStudentPage(pagination: Pagination) {
    return this.api.get<Page<UserListItemDto>>({
      path: path('/list/students'),
      params: pagination,
    });
  }

  findTeacherPage(pagination: Pagination) {
    return this.api.get<Page<UserListItemDto>>({
      path: path('/list/teachers'),
      params: pagination,
    });
  }
}
