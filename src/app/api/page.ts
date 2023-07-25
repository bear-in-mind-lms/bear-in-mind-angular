export interface Page<ContentType> {
  readonly content: ContentType[];
  readonly totalPages: number;
}
