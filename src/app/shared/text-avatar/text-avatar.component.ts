import { NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

const MODULO_HUE = 356;
const LETTER_HUE_MULTIPLIER = 14;

@Component({
  selector: 'app-text-avatar',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './text-avatar.component.html',
  styleUrls: ['./text-avatar.component.scss'],
})
export class TextAvatarComponent implements OnInit {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) size!: number;

  backgroundColor!: string;
  fontSize!: string;

  ngOnInit() {
    this.initBackgroundColor(this.text);
    this.initFontSize(this.size);
  }

  private initBackgroundColor(text: string) {
    let hue = 0;
    if (text.length === 1) {
      hue = (text.charCodeAt(0) * LETTER_HUE_MULTIPLIER) % MODULO_HUE;
    } else if (text.length === 2) {
      hue = (text.charCodeAt(0) * text.charCodeAt(1)) % MODULO_HUE;
    }

    this.backgroundColor = `hsl(${hue}, 50%, 50%)`;
  }

  private initFontSize(size: number) {
    const fontSize = size / 1.8;
    this.fontSize = `${fontSize}px`;
  }
}
