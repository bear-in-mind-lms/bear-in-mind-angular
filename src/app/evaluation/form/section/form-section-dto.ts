import { SectionFieldDto } from './field/section-field-dto';

export interface FormSectionDto {
  readonly name: string;
  readonly fields: SectionFieldDto[];
}
