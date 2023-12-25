import { NgForOf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FieldType } from './field-type';
import { SectionFieldDto } from './section-field-dto';

@Component({
  selector: 'app-section-field',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgForOf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  templateUrl: './section-field.component.html',
})
export class SectionFieldComponent {
  protected readonly FieldType = FieldType;

  @Input({ required: true }) field!: SectionFieldDto;
  @Input({ required: true }) formControls!: FormControl<
    string | boolean | null
  >[];
}
