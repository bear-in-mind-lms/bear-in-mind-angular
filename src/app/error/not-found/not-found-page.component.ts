import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ErrorPageComponent } from '../error-page.component';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink, MatButtonModule, ErrorPageComponent],
  templateUrl: './not-found-page.component.html',
})
export class NotFoundPageComponent {
  readonly notFoundImage = 'assets/graphics/not-found.png';
  readonly gradientColors = ['#311b92', '#7e57c2'];
}
