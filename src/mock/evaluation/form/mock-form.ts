import { EvaluationConfig } from '../../../app/evaluation/evaluation-config';

export interface MockForm {
  readonly id: string;
  readonly sections: MockFormSection[];
}

export interface MockFormSection {
  readonly name: string;
  readonly fields: MockSectionField[];
}

export interface MockSectionField {
  readonly id: string;
  readonly fieldType: string;
  readonly label: string;
  readonly maxPoints: number;
  readonly options?: string[];
  readonly points?: number[];
}

export function tryEvaluateFieldAutomatically(
  field: MockSectionField,
  value: string,
) {
  if (value.trim() === '') {
    return 0;
  } else if (field.points !== undefined) {
    const values = value.split(EvaluationConfig.answerOptionSeparator);

    return values.reduce((previousValue, currentValue) => {
      const valueIndex = field.options!.indexOf(currentValue);
      return previousValue + field.points![valueIndex];
    }, 0);
  }

  return undefined;
}
