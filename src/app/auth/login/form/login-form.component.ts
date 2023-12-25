import { NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
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
import { CredentialsDto } from '../../credentials-dto';
import { LoggedInUserService } from '../../logged-in-user.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnDestroy {
  private logInSubscription?: Subscription;

  protected readonly loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  protected obscure = true;

  constructor(
    private readonly router: Router,
    private readonly authApi: AuthApiService,
    private readonly loggedInUser: LoggedInUserService,
    private readonly snackBar: ApiErrorSnackBar,
  ) {}

  ngOnDestroy() {
    this.logInSubscription?.unsubscribe();
  }

  protected async onSubmit() {
    this.logInSubscription = this.authApi
      .logIn(await this.createCredentialsDto())
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
  }

  private async createCredentialsDto(): Promise<CredentialsDto> {
    const controls = this.loginForm.controls;
    return {
      username: controls.username.value!,
      password: await this.digestPassword(controls.password.value!),
    };
  }

  private async digestPassword(password: string) {
    const encodedPassword = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedPassword);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
  }
}
