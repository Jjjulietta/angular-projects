import { Component } from '@angular/core';
import { SearchCards } from '../../models/search-item.model';
import { SortingService } from '../../../core/services/sorting.service';
import { YoutubeService } from '../../services/youtube.service';
import { SortType } from 'src/app/core/enums/sort-type';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { UnsubscribeService } from 'src/app/core/services/unsubscribe.service';

@Component({
  selector: 'app-search-results-block',
  templateUrl: './search-results-block.component.html',
  styleUrls: ['./search-results-block.component.scss'],
})
export class SearchResultsBlockComponent {
  cards: SearchCards[] = [];
  sort: SortType | string = SortType.Default;
  sortView: SortType = SortType.Default;
  word: string | null = null;

  constructor(
    private sortingService: SortingService,
    private youtubeService: YoutubeService,
    private unsubscribe$: UnsubscribeService
  ) {}

  ngOnInit() {
    this.getCards();
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

  getCards() {
    this.youtubeService
      .getResultSearch$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => (this.cards = val));
  }
}
