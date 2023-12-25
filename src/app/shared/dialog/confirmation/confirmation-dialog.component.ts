import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

interface DialogData {
  readonly title: string;
  readonly content?: string;
  readonly negativeButtonTitle: string;
  readonly positiveButtonTitle: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [NgIf, MatDialogModule, MatButtonModule],
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialog {
  constructor(
    private readonly dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) protected readonly data: DialogData,
  ) {}

  protected close() {
    this.dialogRef.close();
  }
}
