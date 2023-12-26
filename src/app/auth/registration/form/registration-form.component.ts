import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiErrorSnackBar } from '../../../api/api-error-snack-bar/api-error-snack-bar.service';
import { AuthApiService } from '../../../api/auth/auth-api.service';
import { AppRoute } from '../../../routing/app-route';
import { PasswordFormFieldDirective } from '../../../shared/password-form-field/password-form-field.directive';
import { CreateUserDto } from '../../create-user-dto';
import { digestPassword } from '../../crypto';
import { LoggedInUserService } from '../../logged-in-user.service';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    PasswordFormFieldDirective,
  ],
  templateUrl: './registration-form.component.html',
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  private readonly subscriptions: Subscription[] = [];
  protected signUpSubscription?: Subscription;

  protected readonly registrationForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    lastName: new FormControl(''),
  });

  protected emailError?: string;

  constructor(
    private readonly router: Router,
    private readonly authApi: AuthApiService,
    private readonly loggedInUser: LoggedInUserService,
    private readonly snackBar: ApiErrorSnackBar,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.registrationForm.controls.email.valueChanges.subscribe(
        this.updateEmailError,
      ),
    );
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  protected async signUp() {
    this.updateEmailError();

    if (this.registrationForm.invalid) {
      return;
    }

    this.signUpSubscription = this.authApi
      .signUp(await this.createUserDto())
      .subscribe((response) => {
        if (response.isSuccess()) {
          this.loggedInUser.logIn(response.content!);
          this.router.navigateByUrl(AppRoute.main.routerLink, {
            replaceUrl: true,
          });
        } else {
          this.snackBar.open(response.error!);
        }
      });
    this.subscriptions.push(this.signUpSubscription);
  }

  private readonly updateEmailError = () => {
    const emailControl = this.registrationForm.controls.email;
    if (emailControl.hasError('required')) {
      this.emailError = $localize`:@@fieldIsRequired:`;
    } else if (emailControl.hasError('email')) {
      this.emailError = $localize`:@@fieldMustBeValidEmail:`;
    } else {
      this.emailError = undefined;
    }
  };

  private async createUserDto(): Promise<CreateUserDto> {
    const controls = this.registrationForm.controls;
    return {
      email: controls.email.value!,
      password: await digestPassword(controls.password.value!),
      firstName: controls.firstName.value!,
      lastName: controls.lastName.value!,
      middleName:
        controls.middleName.value!.trim() === ''
          ? undefined
          : controls.middleName.value!,
    };
  }
}
