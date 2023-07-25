import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith, tap } from 'rxjs';
import { SupportedLocales } from '../../../../locale/supported-locales';

interface DialogData {
  readonly excludedLanguages: string[];
}

@Component({
  selector: 'app-language-picker',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
  ],
  templateUrl: './language-picker-dialog.component.html',
})
export class LanguagePickerDialog implements OnInit {
  readonly localeOptions = [...SupportedLocales.entries()];

  formControl = new FormControl('');
  filteredLocaleOptions!: Observable<readonly (readonly [string, string])[]>;

  localeName = '';

  constructor(
    readonly dialogRef: MatDialogRef<LanguagePickerDialog>,
    @Inject(MAT_DIALOG_DATA) readonly data: DialogData,
  ) {}

  ngOnInit() {
    this.formControl.addValidators(this.validateLocale);
    this.filteredLocaleOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      tap(this.updateLocaleName),
      map(this.filterLocale),
    );
  }

  close() {
    this.dialogRef.close();
  }

  private readonly filterLocale = (query: string | null) => {
    if ((query ?? '') === '') {
      return this.localeOptions;
    }

    const lowerCaseQuery = query!.toLowerCase();
    return this.localeOptions.filter(
      (option) =>
        !this.data.excludedLanguages.includes(option[0]) &&
        `${option[0]}${option[1]}`.toLowerCase().includes(lowerCaseQuery),
    );
  };

  private readonly validateLocale = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const value = control.value;
    if (value === '') {
      return null;
    }

    const isLocaleValid =
      !this.data.excludedLanguages.includes(value) &&
      SupportedLocales.has(value);
    return isLocaleValid ? null : { invalidLocale: true };
  };

  private readonly updateLocaleName = (value: string | null) => {
    const length = value?.length ?? 0;
    if (length > 0 && length <= 5) {
      this.localeName = SupportedLocales.get(value!) ?? '';
    } else {
      this.localeName = '';
    }
  };
}
