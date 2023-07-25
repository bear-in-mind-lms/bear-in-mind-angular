import { NgForOf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ListItemDto } from '../list-item-dto';
import { CardListItemComponent } from './item/card-list-item.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [NgForOf, CardListItemComponent],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent {
  @Input({ required: true }) items!: ListItemDto[];
  @Input({ required: true }) route!: string;
  @Input({ required: true }) imagePlaceholder!: string;
}
