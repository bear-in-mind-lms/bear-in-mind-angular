export interface CreateOrUpdateUserGroupDto {
  /**
   * Mapping of locale to text
   */
  readonly name: { [locale: string]: string };
}
