import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-section',
  standalone: true,
  imports: [NgIf, RouterLink, MatButtonModule],
  templateUrl: './page-section.component.html',
  styleUrls: ['./page-section.component.scss'],
})
export class PageSectionComponent {
  @Input({ required: true }) sectionTitle!: string;
  @Input() sectionActionTitle?: string;
  @Input() sectionActionRoute?: string;
}
