import { MockForm } from '../form/mock-form';

interface MockQuizGradeDto {
  readonly minimumPercentage: number;
  readonly name: string;
  readonly passed: boolean;
}

export interface MockQuizResultAnswer {
  readonly answer: string;
  readonly points?: number;
  readonly automatic?: boolean;
}

export interface MockQuizResult {
  readonly status: string;
  readonly submittedAt: string;
  readonly evaluatedAt?: string;
  readonly grade?: string;
  readonly answers?: Map<string, MockQuizResultAnswer>;
}

export interface MockQuiz {
  readonly id: string;
  readonly courseLessonId: number;
  readonly name: string;
  readonly maxPoints: number;
  readonly grades: MockQuizGradeDto[];
  readonly form: MockForm;
  readonly userResults: Map<number, MockQuizResult>;
}
