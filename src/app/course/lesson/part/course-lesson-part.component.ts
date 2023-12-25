import { NgForOf, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CourseLessonPartDto } from '../course-lesson-part-dto';

interface Attachment {
  readonly name: string;
  readonly url: string;
  readonly icon: string;
}

function getUrlIcon(url: string) {
  const lastDotPosition = url.lastIndexOf('.');
  if (lastDotPosition === -1) {
    return 'public';
  }

  const extension = url.substring(lastDotPosition + 1);
  switch (extension) {
    case 'bmp':
    case 'jpg':
    case 'jpeg':
    case 'png':
      return 'image';
    case 'gif':
      return 'gif';
    case 'pdf':
      return 'picture_as_pdf';
    default:
      return 'public';
  }
}

@Component({
  selector: 'app-course-lesson-part',
  standalone: true,
  imports: [NgIf, NgForOf, MatChipsModule, MatIconModule],
  templateUrl: './course-lesson-part.component.html',
})
export class CourseLessonPartComponent implements OnInit {
  protected parsedAttachments?: Attachment[];

  @Input({ required: true }) lessonPart!: CourseLessonPartDto;

  ngOnInit() {
    if (this.lessonPart.attachments !== undefined) {
      this.parsedAttachments = this.lessonPart.attachments
        .split('\n')
        .map((attachment) => {
          const colonPosition = attachment.indexOf(':');
          const name = attachment.substring(0, colonPosition);
          const url = attachment.substring(colonPosition + 1);
          return { name: name === '' ? url : name, url, icon: getUrlIcon(url) };
        });
    }
  }
}
