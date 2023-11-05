import { FieldType } from '../../../app/evaluation/form/section/field/field-type';
import { MockForm } from './mock-form';

export const mockForms = new Map<string, MockForm>([
  [
    'java-variables-form',
    {
      id: 'java-variables-form',
      sections: [
        {
          name: 'Java variables',
          fields: [
            {
              id: 'fraction-primitive-type',
              fieldType: FieldType.checkbox,
              label: 'Which primitive type can be used to store fractions?',
              maxPoints: 1,
              options: ['float', 'long'],
              points: [1, -1],
            },
            {
              id: 'primitive-types',
              fieldType: FieldType.number,
              label: 'How many primitive types are there in Java?',
              maxPoints: 1,
            },
            {
              id: 'correct-code',
              fieldType: FieldType.radio,
              label: 'Which line of code is correct?',
              maxPoints: 1,
              options: ['char c = "c";', 'String s = "s";'],
              points: [0, 1],
            },
            {
              id: 'constant-keyword',
              fieldType: FieldType.select,
              label: 'Select the keyword that defines a constant in Java',
              maxPoints: 1,
              options: ['const', 'final'],
              points: [0, 1],
            },
            {
              id: 'initialize-array',
              fieldType: FieldType.text,
              label:
                'Declare a variable and initialize its value with an array of integers',
              maxPoints: 1,
            },
          ],
        },
      ],
    },
  ],
  [
    'gamification-definition-form',
    {
      id: 'gamification-definition-form',
      sections: [
        {
          name: 'Gamification definition',
          fields: [
            {
              id: 'gamification',
              fieldType: FieldType.radio,
              label: 'What is gamification?',
              maxPoints: 1,
              options: [
                'It is the game development process',
                'It is an attempt to motivate and engage users by creating a game-like experience',
                'It is the irradiation of an object with gamma rays',
              ],
              points: [0, 1, 0],
            },
          ],
        },
      ],
    },
  ],
  [
    'gamification-form',
    {
      id: 'gamification-form',
      sections: [
        {
          name: 'Theoretical part',
          fields: [
            {
              id: 'avatar',
              fieldType: FieldType.radio,
              label: 'What is avatar?',
              maxPoints: 1,
              options: [
                "A graph providing information about a player's performance",
                'Visual representation of player within gamification environment',
              ],
              points: [0, 1],
            },
            {
              id: 'not-game-design',
              fieldType: FieldType.select,
              label: 'Select an element that is not part of game design',
              maxPoints: 1,
              options: ['Points', 'Homeworks', 'Leaderboards'],
              points: [0, 1, 0],
            },
            {
              id: 'stories',
              fieldType: FieldType.text,
              label:
                'Describe what stories should be like in a gamified course',
              maxPoints: 1,
            },
            {
              id: 'game-design-elements',
              fieldType: FieldType.number,
              label: 'How many basic elements of game design are there?',
              maxPoints: 1,
            },
          ],
        },
        {
          name: 'Practical part',
          fields: [
            {
              id: 'rewards',
              fieldType: FieldType.checkbox,
              label:
                'According to gamification, how would you reward your students?',
              maxPoints: 1,
              options: ['Experience points', 'Free pizza', 'Badges'],
              points: [0.5, -1, 0.5],
            },
          ],
        },
      ],
    },
  ],
]);
