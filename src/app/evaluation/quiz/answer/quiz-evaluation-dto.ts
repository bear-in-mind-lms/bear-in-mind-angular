export interface QuizEvaluationDto {
  readonly evaluation: {
    [fieldId: string]: number;
  };
}
