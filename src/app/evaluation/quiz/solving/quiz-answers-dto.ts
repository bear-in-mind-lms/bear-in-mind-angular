export interface QuizAnswersDto {
  readonly answers: {
    [fieldId: string]: string;
  };
}
