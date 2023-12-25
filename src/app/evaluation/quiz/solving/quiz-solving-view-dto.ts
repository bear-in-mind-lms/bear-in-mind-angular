import { FormSectionDto } from '../../form/section/form-section-dto';

export interface QuizSolvingViewDto {
  readonly name: string;
  readonly sections: FormSectionDto[];
}
