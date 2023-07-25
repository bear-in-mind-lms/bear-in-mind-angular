import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocaleConfig } from '../../../../../locale/locale-config';
import { ApiErrorSnackBar } from '../../../../api/api-error-snack-bar/api-error-snack-bar.service';
import { UserGroupApiService } from '../../../../api/user/user-group-api.service';
import { AppRoute, AppRouteParam } from '../../../../routing/app-route';
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
    TranslationsFormFieldComponent,
  ],
  templateUrl: './user-group-creator-form.component.html',
})
export class UserGroupCreatorFormComponent implements OnDestroy {
  readonly translationFieldLabelMap = new Map<TranslationField, string>([
    ['name', $localize`:@@name:`],
  ]);

  readonly userGroupForm = new FormGroup({
    name: new FormControl<Map<string, Map<TranslationField, string>>>(
      new Map([[LocaleConfig.serverLocale, new Map()]]),
    ),
  });

  createUserGroupSubscription?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly userGroupApi: UserGroupApiService,
    private readonly snackBar: ApiErrorSnackBar,
  ) {}

  ngOnDestroy() {
    this.createUserGroupSubscription?.unsubscribe();
  }

  createUserGroup() {
    this.createUserGroupSubscription = this.userGroupApi
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
      });
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
