import { QuizStatus } from './quiz-status';

export function getQuizStatusDisplayInfo(status: string) {
  switch (status) {
    case QuizStatus.sent: {
      return {
        icon: 'pending',
        iconClass: 'warn',
        name: $localize`:@@awaitingResults:`,
      };
    }
    case QuizStatus.passed: {
      return {
        icon: 'check_circle_outline',
        iconClass: 'success',
        name: $localize`:@@passed:`,
      };
    }
    case QuizStatus.failed: {
      return {
        icon: 'highlight_remove',
        iconClass: 'error',
        name: $localize`:@@failed:`,
      };
    }
    case QuizStatus.toDo:
    default: {
      return {
        icon: 'pending_actions',
        iconClass: '',
        name: $localize`:@@toDo:`,
      };
    }
  }
}
