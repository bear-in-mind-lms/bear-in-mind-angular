import { mockForms } from './mock-form-data';

export function findFormById(id: string) {
  return mockForms.get(id)!;
}
