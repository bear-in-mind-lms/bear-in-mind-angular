import { NgForOf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Moment } from 'moment';
import { TimeConfig } from '../time-config';

const TIME_OPTIONS = (() => {
  const options = [];
  for (let h = 0; h <= 23; ++h) {
    for (let m = 0; m < 4; ++m) {
      options.push(`${h}:${(m * 15).toString().padStart(2, '0')}`);
    }
  }
  return options;
})();

@Component({
  selector: 'app-date-time-form-field',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatAutocompleteModule,
  ],
  templateUrl: './date-time-form-field.component.html',
  styleUrls: ['./date-time-form-field.component.scss'],
})
export class DateTimeFormFieldComponent {
  readonly timeOptions = TIME_OPTIONS;

  readonly dateFormat = TimeConfig.dateFormat;

  @Input({ required: true }) fieldLabel!: string;
  @Input({ required: true }) dateFormControl!: FormControl<Moment | null>;
  @Input({ required: true }) timeFormControl!: FormControl<string | null>;
}
