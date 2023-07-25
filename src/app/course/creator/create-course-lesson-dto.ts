import { CreateCourseLessonPartDto } from './create-course-lesson-part-dto';

export type TranslationField = 'topic' | 'description';

export interface CreateCourseLessonDto {
  /**
   * Mapping of locale to field texts
   */
  readonly translations: {
    [locale: string]: { [fieldName: string]: string };
  };
  readonly startDateTime?: string;
  readonly parts?: CreateCourseLessonPartDto[];
}
