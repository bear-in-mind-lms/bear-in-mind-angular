import { QuizEvaluatedAnswerPointsDto } from './quiz-evaluated-answer-points-dto';

export interface QuizEvaluatedAnswerDto {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly maxPoints: number;
  readonly points?: QuizEvaluatedAnswerPointsDto;
}
