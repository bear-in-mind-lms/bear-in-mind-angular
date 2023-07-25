import { ListItemDto } from '../shared/list-item-dto';

export interface UserCourseDto extends ListItemDto {
  readonly roles: string[];
}
