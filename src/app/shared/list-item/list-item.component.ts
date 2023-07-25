import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgIf, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { AppRouteParam } from '../../routing/app-route';
import { ListItemDto } from '../list-item-dto';
import { injectPathVariables } from '../path-utils';
import { InitialsPipe } from '../pipe/initials.pipe';
import { TextAvatarComponent } from '../text-avatar/text-avatar.component';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [
    NgIf,
    NgStyle,
    RouterLink,
    MatListModule,
    TextAvatarComponent,
    InitialsPipe,
  ],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  itemRoute!: string;
  itemImage?: string;
  hasAvatarPlaceholder = false;

  @Input({ required: true }) item!: ListItemDto;
  @Input({ required: true }) route!: string;
  @Input() imagePlaceholder: string | undefined;

  @Input()
  get avatarPlaceholder() {
    return this.hasAvatarPlaceholder;
  }

  set avatarPlaceholder(value: BooleanInput) {
    this.hasAvatarPlaceholder = coerceBooleanProperty(value);
  }

  ngOnInit() {
    this.itemRoute = injectPathVariables(this.route, {
      [AppRouteParam.id]: this.item.id,
    });

    const imageOrPlaceholder = this.item.image ?? this.imagePlaceholder;
    if (imageOrPlaceholder !== undefined) {
      this.itemImage = `url(${imageOrPlaceholder})`;
    }
  }
}
