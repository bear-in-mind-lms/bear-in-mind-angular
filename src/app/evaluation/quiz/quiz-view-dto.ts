export interface QuizViewDto {
  readonly name: string;
  readonly status: string;
  readonly questionCount: number;
  readonly grade?: string;
  readonly result?: number;
  readonly maxPoints?: number;
  readonly submittedAt?: string;
  readonly evaluatedAt?: string;
}
