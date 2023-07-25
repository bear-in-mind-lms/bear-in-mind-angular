import { UserListItemDto } from '../user-list-item-dto';

export interface UserGroupDto {
  readonly name: string;
  readonly image?: string;
  readonly members: UserListItemDto[];
  readonly role?: string;
}
