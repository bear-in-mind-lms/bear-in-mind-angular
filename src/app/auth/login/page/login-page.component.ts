import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { RegistrationFormComponent } from '../../registration/form/registration-form.component';
import { LoginFormComponent } from '../form/login-form.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    NgStyle,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    LoginFormComponent,
    RegistrationFormComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  protected readonly backgroundUrl =
    'url(assets/graphics/login-page-background.png)';
}
