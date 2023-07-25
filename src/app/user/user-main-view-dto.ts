import { UserGroupListItemDto } from './group/user-group-list-item-dto';

export interface UserMainViewDto {
  readonly registeredGroups: UserGroupListItemDto[];
  readonly availableGroups: UserGroupListItemDto[];
  readonly hasTeachers: boolean;
  readonly hasStudents: boolean;
}
