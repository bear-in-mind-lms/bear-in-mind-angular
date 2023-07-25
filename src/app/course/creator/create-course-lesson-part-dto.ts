export interface CreateCourseLessonPartDto {
  /**
   * Mapping of locale to text
   */
  readonly text?: { [locale: string]: string };
  readonly attachments?: string;
}
