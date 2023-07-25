import { UserGroupListItemDto } from './group/user-group-list-item-dto';
import { UserCourseDto } from './user-course-dto';

export interface UserViewDto {
  readonly name: string;
  readonly title?: string;
  readonly image?: string;
  readonly registrationDateTime: string;
  readonly courses: UserCourseDto[];
  readonly groups: UserGroupListItemDto[];
}
