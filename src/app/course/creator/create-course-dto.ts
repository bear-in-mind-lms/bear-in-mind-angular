import { CreateCourseLessonDto } from './create-course-lesson-dto';

export type TranslationField = 'name' | 'description';

export interface CreateCourseDto {
  /**
   * Mapping of locale to field texts
   */
  readonly translations: {
    [locale: string]: { [fieldName: string]: string };
  };
  readonly startDateTime?: string;
  readonly endDateTime?: string;
  readonly registrationClosingDateTime?: string;
  readonly lessons?: CreateCourseLessonDto[];
}
