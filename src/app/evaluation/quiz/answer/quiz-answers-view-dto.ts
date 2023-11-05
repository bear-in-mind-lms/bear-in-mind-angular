import { QuizGradeDto } from '../quiz-grade-dto';
import { QuizEvaluatedAnswerDto } from './quiz-evaluated-answer-dto';

export interface QuizAnswersViewDto {
  readonly name: string;
  readonly grades: QuizGradeDto[];
  readonly answers: QuizEvaluatedAnswerDto[];
}
