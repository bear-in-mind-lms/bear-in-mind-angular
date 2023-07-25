import { mockUsers } from '../mock-user-data';
import { MockUserGroup } from './mock-user-group';

export const mockUserGroups = new Map<number, MockUserGroup>([
  [
    1,
    {
      id: 1,
      name: 'Administrators',
      image:
        'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      owners: [mockUsers.get(1)!],
      members: [],
    },
  ],
  [
    2,
    {
      id: 2,
      name: 'Teachers',
      image:
        'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      owners: [mockUsers.get(5)!],
      members: [
        mockUsers.get(1)!,
        mockUsers.get(2)!,
        mockUsers.get(3)!,
        mockUsers.get(4)!,
      ],
    },
  ],
  [
    3,
    {
      id: 3,
      name: 'Students',
      owners: [mockUsers.get(6)!],
      members: [
        mockUsers.get(7)!,
        mockUsers.get(8)!,
        mockUsers.get(9)!,
        mockUsers.get(10)!,
        mockUsers.get(11)!,
        mockUsers.get(12)!,
        mockUsers.get(13)!,
        mockUsers.get(14)!,
        mockUsers.get(15)!,
        mockUsers.get(16)!,
        mockUsers.get(17)!,
      ],
    },
  ],
]);
