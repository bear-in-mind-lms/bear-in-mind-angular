export interface QuizListItemDto {
  readonly id: string;
  readonly name: string;
  readonly status: string;
  readonly userId?: number;
  readonly userName?: string;
  readonly grade?: string;
  readonly result?: number;
  readonly maxPoints?: number;
}
