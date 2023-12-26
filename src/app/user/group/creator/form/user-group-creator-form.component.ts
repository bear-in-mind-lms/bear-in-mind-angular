import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocaleConfig } from '../../../../../locale/locale-config';
import { ApiErrorSnackBar } from '../../../../api/api-error-snack-bar/api-error-snack-bar.service';
import { UserGroupApiService } from '../../../../api/user/user-group-api.service';
import { AppRoute, AppRouteParam } from '../../../../routing/app-route';
import { ConfirmationDialog } from '../../../../shared/dialog/confirmation/confirmation-dialog.component';
import { injectPathVariables } from '../../../../shared/path-utils';
import { convertLocaleFieldTextsMapToSingleFieldIndexSignature } from '../../../../shared/translation-utils';
import { TranslationsFormFieldComponent } from '../../../../shared/translations-form-field/translations-form-field.component';
import { CreateOrUpdateUserGroupDto } from '../create-or-update-user-group-dto';

type TranslationField = 'name';

@Component({
  selector: 'app-user-group-creator-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    TranslationsFormFieldComponent,
  ],
  templateUrl: './user-group-creator-form.component.html',
})
export class UserGroupCreatorFormComponent implements OnDestroy {
  private readonly subscriptions: Subscription[] = [];

  protected readonly translationFieldLabelMap = new Map<
    TranslationField,
    string
  >([['name', $localize`:@@name:`]]);

  protected readonly userGroupForm = new FormGroup({
    name: new FormControl<Map<string, Map<TranslationField, string>>>(
      new Map([[LocaleConfig.serverLocale, new Map()]]),
    ),
  });

  constructor(
    private readonly router: Router,
    private readonly userGroupApi: UserGroupApiService,
    private readonly dialog: MatDialog,
    private readonly snackBar: ApiErrorSnackBar,
  ) {}

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  protected create() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        title: $localize`:@@confirmUserGroupCreationTitle:`,
        content: $localize`:@@confirmUserGroupCreationContent:`,
        negativeButtonTitle: $localize`:@@cancel:`,
        positiveButtonTitle: $localize`:@@create:`,
      },
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((result) => {
        if (result !== undefined) {
          this.sendCreateUserGroupRequest();
        }
      }),
    );
  }

  protected isCreating() {
    return this.subscriptions.some((subscription) => !subscription.closed);
  }

  private sendCreateUserGroupRequest() {
    this.subscriptions.push(
      this.userGroupApi
        .createUserGroup(this.createUserGroupDto())
        .subscribe((response) => {
          if (response.isSuccess()) {
            this.router.navigateByUrl(
              injectPathVariables(AppRoute.userGroup.routerLink, {
                [AppRouteParam.id]: response.content!,
              }),
              {
                replaceUrl: true,
              },
            );
          } else {
            this.snackBar.open(response.error!);
          }
        }),
    );
  }

  private createUserGroupDto(): CreateOrUpdateUserGroupDto {
    const controls = this.userGroupForm.controls;

    return {
      name: convertLocaleFieldTextsMapToSingleFieldIndexSignature(
        controls.name.value!,
        'name',
      ),
    };
  }
}
