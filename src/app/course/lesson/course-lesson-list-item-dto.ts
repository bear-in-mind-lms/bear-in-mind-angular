export interface CourseLessonListItemDto {
  readonly id: number;
  readonly ordinal: number;
  readonly topic: string;
  readonly description?: string;
}
