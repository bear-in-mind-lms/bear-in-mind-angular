import { NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [NgStyle, RouterLink, MatButtonModule],
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent implements OnInit {
  @Input({ required: true }) errorTitle!: string;
  @Input({ required: true }) errorSubtitle!: string;

  @Input({ required: true }) gradientColors!: string[];
  private imageUrl!: string;

  @Input({ required: true })
  get image() {
    return this.imageUrl;
  }

  set image(value: string) {
    this.imageUrl = `url(${value})`;
  }

  protected gradient!: string;

  ngOnInit() {
    this.gradient = `linear-gradient(${this.gradientColors.join(',')})`;
  }
}
