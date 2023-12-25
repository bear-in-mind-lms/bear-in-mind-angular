import { QuizStatus } from '../../../app/evaluation/quiz/quiz-status';
import { findFormById } from '../form/mock-form-repository';
import { MockQuiz, MockQuizResult } from './mock-quiz';

function countQuizMaxPointsByFormId(id: string) {
  return findFormById(id)
    .sections.flatMap((section) => section.fields)
    .reduce(
      (previousValue, currentValue) => previousValue + currentValue.maxPoints,
      0,
    );
}

export const mockQuizzes = new Map<string, MockQuiz>([
  // Java -> Variables
  [
    'java-variables-quiz',
    {
      id: 'java-variables-quiz',
      courseLessonId: 102,
      name: 'Variables test',
      maxPoints: countQuizMaxPointsByFormId('java-variables-form'),
      grades: [
        { minimumPercentage: 1, name: 'A', passed: true },
        { minimumPercentage: 0.8, name: 'B', passed: true },
        { minimumPercentage: 0.6, name: 'C', passed: true },
        { minimumPercentage: 0.4, name: 'D', passed: false },
        { minimumPercentage: 0, name: 'F', passed: false },
      ],
      form: findFormById('java-variables-form'),
      userResults: new Map<number, MockQuizResult>([
        [
          6,
          {
            status: QuizStatus.passed,
            submittedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
            evaluatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
            grade: 'A',
            answers: new Map([
              [
                'fraction-primitive-type',
                { answer: 'float', points: 1, automatic: true },
              ],
              ['primitive-types', { answer: '8', points: 1, automatic: false }],
              [
                'correct-code',
                { answer: 'String s = "s";', points: 1, automatic: true },
              ],
              [
                'constant-keyword',
                { answer: 'final', points: 1, automatic: true },
              ],
              [
                'initialize-array',
                {
                  answer: 'int array[] = {0, 1, 2};',
                  points: 1,
                  automatic: false,
                },
              ],
            ]),
          },
        ],
        [
          8,
          {
            status: QuizStatus.sent,
            submittedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
            answers: new Map([
              [
                'fraction-primitive-type',
                { answer: 'float', points: 1, automatic: true },
              ],
              ['primitive-types', { answer: '7' }],
              [
                'correct-code',
                { answer: 'String s = "s";', points: 1, automatic: true },
              ],
              [
                'constant-keyword',
                { answer: 'const', points: 0, automatic: true },
              ],
              ['initialize-array', { answer: '', points: 0, automatic: true }],
            ]),
          },
        ],
      ]),
    },
  ],
  // Gamification in Education -> What is gamification
  [
    'gamification-definition-quiz',
    {
      id: 'gamification-definition-quiz',
      courseLessonId: 901,
      name: 'Definition',
      maxPoints: countQuizMaxPointsByFormId('gamification-definition-form'),
      grades: [
        { minimumPercentage: 1, name: 'Passed', passed: true },
        { minimumPercentage: 0, name: 'Failed', passed: false },
      ],
      form: findFormById('gamification-definition-form'),
      userResults: new Map<number, MockQuizResult>([
        [
          1,
          {
            status: QuizStatus.passed,
            submittedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
            evaluatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
            grade: 'Passed',
            answers: new Map([
              [
                'gamification',
                {
                  answer:
                    'It is an attempt to motivate and engage users by creating a game-like experience',
                  points: 1,
                  automatic: true,
                },
              ],
            ]),
          },
        ],
      ]),
    },
  ],
  [
    'gamification-quiz',
    {
      id: 'gamification-quiz',
      courseLessonId: 901,
      name: 'Gamification exam',
      maxPoints: countQuizMaxPointsByFormId('gamification-form'),
      grades: [
        { minimumPercentage: 1, name: 'A', passed: true },
        { minimumPercentage: 0.8, name: 'B', passed: true },
        { minimumPercentage: 0.6, name: 'C', passed: true },
        { minimumPercentage: 0.4, name: 'D', passed: false },
        { minimumPercentage: 0, name: 'F', passed: false },
      ],
      form: findFormById('gamification-form'),
      userResults: new Map(),
    },
  ],
]);
