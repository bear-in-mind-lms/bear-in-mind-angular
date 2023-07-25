export interface MockUser {
  readonly id: number;
  readonly username: string;
  readonly name: string;
  readonly title?: string;
  readonly registrationDateTime: string;
  readonly image?: string;
  readonly roles: string[];
}
