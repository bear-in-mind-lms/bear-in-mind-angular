import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ErrorPageComponent } from '../error-page.component';

@Component({
  selector: 'app-forbidden-page',
  standalone: true,
  imports: [RouterLink, MatButtonModule, ErrorPageComponent],
  templateUrl: './forbidden-page.component.html',
})
export class ForbiddenPageComponent {
  readonly forbiddenImage = 'assets/graphics/forbidden.png';
  readonly gradientColors = ['#ffee58', '#f9a825'];
}
