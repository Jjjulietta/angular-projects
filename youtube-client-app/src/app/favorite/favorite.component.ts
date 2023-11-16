import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { SortType } from '../core/enums/sort-type';
import { SortingService } from '../core/services/sorting.service';
import { UnsubscribeService } from '../core/services/unsubscribe.service';
import { selectFavoriteCards } from '../redux/selectors/cards.selector';
import { SearchCards } from '../youtube/models/search-item.model';
import { YoutubeService } from '../youtube/services/youtube.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent {
  favoriteCards$ = this.store.select(selectFavoriteCards);
  favoriteCards!: SearchCards[];
  sort: SortType | string = SortType.Default;
  sortView: SortType = SortType.Default;
  word: string | null = null;

  constructor(
    private store: Store,
    private sortingService: SortingService,
    private youtubeService: YoutubeService,
    private unsubscribe$: UnsubscribeService
  ) {}

  ngOnInit() {
    this.favoriteCards$ = this.store.select(selectFavoriteCards);
    console.log(this.favoriteCards$);
    this.sortingService
      .getSortingState$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => (this.sort = val));
    this.sortingService
      .getSortinViewState$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => (this.sortView = val));
    this.sortingService
      .getWordState$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => {
        if (val !== null) this.word = val;
      });
  }
}
