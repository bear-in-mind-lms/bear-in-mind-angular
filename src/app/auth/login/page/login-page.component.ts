import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LoginFormComponent } from '../form/login-form.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NgStyle, MatCardModule, LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  readonly backgroundUrl = 'url(assets/graphics/login-page-background.png)';
}
