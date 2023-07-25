import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true,
})
export class InitialsPipe implements PipeTransform {
  transform(value: string) {
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      return '';
    }

    const parts = trimmed.split(' ');
    return parts.length === 1
      ? parts[0].charAt(0)
      : `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`;
  }
}
