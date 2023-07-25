import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-section-content-placeholder',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './page-section-content-placeholder.component.html',
  styleUrls: ['./page-section-content-placeholder.component.scss'],
})
export class PageSectionContentPlaceholderComponent {
  private placeholderImageUrl?: string;

  @Input()
  get placeholderImage() {
    return this.placeholderImageUrl;
  }

  set placeholderImage(value: string | undefined) {
    this.placeholderImageUrl =
      value === undefined ? undefined : `url(${value})`;
  }
}
