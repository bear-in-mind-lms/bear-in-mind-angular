import { MockUser } from '../mock-user';

export interface MockUserGroup {
  readonly id: number;
  readonly name: string;
  readonly image?: string;
  readonly owners: MockUser[];
  readonly members: MockUser[];
}
