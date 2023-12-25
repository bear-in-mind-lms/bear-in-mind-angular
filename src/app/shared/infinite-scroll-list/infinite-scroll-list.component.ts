import { BooleanInput } from '@angular/cdk/coercion';
import { NgForOf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Observable, Subscription } from 'rxjs';
import { Page } from '../../api/page';
import { ListItemDto } from '../list-item-dto';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-infinite-scroll-list',
  standalone: true,
  imports: [NgForOf, MatListModule, InfiniteScrollModule, ListItemComponent],
  templateUrl: './infinite-scroll-list.component.html',
})
export class InfiniteScrollListComponent implements OnInit, OnDestroy {
  private currentPage = 0;
  private totalPages = 1;

  private readonly subscriptions: Subscription[] = [];

  protected readonly items: ListItemDto[] = [];

  @Input({ required: true }) fetchPage!: (
    page: number,
  ) => Observable<Page<ListItemDto>>;
  @Input({ required: true }) route!: string;
  @Input() imagePlaceholder?: string;

  @Input() avatarPlaceholder: BooleanInput;

  ngOnInit() {
    this.fetchNextPage();
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  protected fetchNextPage() {
    if (this.currentPage < this.totalPages) {
      this.subscriptions.push(
        this.fetchPage(this.currentPage++).subscribe((page) => {
          this.items.push(...page.content);
          this.totalPages = page.totalPages;
        }),
      );
    }
  }
}
