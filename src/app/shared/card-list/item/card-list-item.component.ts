import { NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { AppRouteParam } from '../../../routing/app-route';
import { ListItemDto } from '../../list-item-dto';
import { injectPathVariables } from '../../path-utils';

@Component({
  selector: 'app-card-list-item',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, MatCardModule, MatRippleModule],
  templateUrl: './card-list-item.component.html',
  styleUrls: ['./card-list-item.component.scss'],
})
export class CardListItemComponent implements OnInit {
  @Input({ required: true }) item!: ListItemDto;
  @Input({ required: true }) route!: string;
  @Input({ required: true }) imagePlaceholder!: string;

  itemRoute!: string;

  ngOnInit() {
    this.itemRoute = injectPathVariables(this.route, {
      [AppRouteParam.id]: this.item.id,
    });
  }
}
