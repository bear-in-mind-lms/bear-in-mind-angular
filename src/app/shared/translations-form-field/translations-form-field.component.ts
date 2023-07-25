import { KeyValuePipe, NgForOf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { LanguagePickerDialog } from '../dialog/language-picker/language-picker-dialog.component';

@Component({
  selector: 'app-translations-form-field',
  standalone: true,
  imports: [
    NgForOf,
    KeyValuePipe,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './translations-form-field.component.html',
})
export class TranslationsFormFieldComponent implements OnInit, OnDestroy {
  private readonly subscriptions: Subscription[] = [];

  private get selectedLocale() {
    return this.tabs[this.selected.value!];
  }

  readonly tabs: string[] = [];
  readonly selected = new FormControl(0);

  readonly translationFieldFormControlMap: Map<
    string,
    FormControl<string | null>
  > = new Map();

  @Input({ required: true }) translationsFormControl!: FormControl<Map<
    string,
    Map<string, string>
  > | null>;
  @Input({ required: true }) translationFieldLabelMap!: Map<string, string>;

  constructor(private readonly dialog: MatDialog) {}

  ngOnInit() {
    const translationsFormControlValue = this.translationsFormControl.value!;
    this.tabs.push(...translationsFormControlValue.keys());
    const selectedLocaleTexts = translationsFormControlValue.get(this.tabs[0])!;
    for (const translationField of this.translationFieldLabelMap.keys()) {
      const formControl = new FormControl(
        selectedLocaleTexts.get(translationField) ?? '',
      );
      this.subscriptions.push(
        formControl.valueChanges.subscribe((value) => {
          this.translationsFormControl
            .value!.get(this.selectedLocale)
            ?.set(translationField, value!);
        }),
      );
      this.translationFieldFormControlMap.set(translationField, formControl);
    }
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  onSelectedIndexChange(index: number) {
    this.selected.setValue(index);
    const translationFieldTextMap =
      this.getTranslationFieldTextMapByIndex(index);

    for (const [translationField, formControl] of this
      .translationFieldFormControlMap) {
      formControl.setValue(translationFieldTextMap.get(translationField) ?? '');
    }
  }

  addLanguage() {
    const dialogRef = this.dialog.open(LanguagePickerDialog, {
      data: {
        excludedLanguages: [...this.translationsFormControl.value!.keys()],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.translationsFormControl.value!.set(result, new Map());
        this.tabs.push(result);
      }
    });
  }

  private getTranslationFieldTextMapByIndex(index: number) {
    const key = [...this.translationsFormControl.value!.keys()][index];
    return this.translationsFormControl.value!.get(key)!;
  }
}
