export interface LoginResponseDto {
  readonly userId: number;
  readonly userFullName: string;
  readonly userImage?: string;
  readonly authorities: string[];
}
