import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardListComponent } from '../../../card-list/card-list.component';
import { ListItemDto } from '../../../list-item-dto';
import { PageSectionContentPlaceholderComponent } from '../placeholder/page-section-content-placeholder.component';

@Component({
  selector: 'app-card-list-page-section-content',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    CardListComponent,
    PageSectionContentPlaceholderComponent,
  ],
  templateUrl: './card-list-page-section-content.component.html',
})
export class CardListPageSectionContentComponent {
  @Input({ required: true }) items!: ListItemDto[];
  @Input({ required: true }) route!: string;
  @Input({ required: true }) imagePlaceholder!: string;
  @Input({ required: true }) emptyContentPlaceholder!: string;
}
