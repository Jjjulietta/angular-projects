import { Component, Input } from '@angular/core';
import { SearchItem, SearchItemVideo } from '../../models/search-item.model';
import { SortingService } from '../../../core/services/sorting.service';
import { YoutubeService } from '../../services/youtube.service';
import { SortType } from 'src/app/core/enums/sort-type';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-results-block',
  templateUrl: './search-results-block.component.html',
  styleUrls: ['./search-results-block.component.scss'],
})
export class SearchResultsBlockComponent {
  cards: SearchItemVideo[] = [];
  sort: SortType | string = SortType.Default;
  sortView: SortType = SortType.Default;
  word: string | null = null;
  //submit: string | null = null;
  subscription$ = new Subject<void>();

  constructor(
    private sortingService: SortingService,
    private youtubeService: YoutubeService
  ) {
    /*this.YoutubeService.submit.subscribe((val: string) => {
      this.submit = val;
      console.log(this.submit);
      if (val) { 
        this.cards = this.YoutubeService.resultsSearch;
      }
    });*/
  }

  ngOnInit() {
    // console.log(this.cards[0]);
    this.getCards();
    this.sortingService.sort
      .pipe(takeUntil(this.subscription$))
      .subscribe((val) => (this.sort = val));
    this.sortingService.sortView
      .pipe(takeUntil(this.subscription$))
      .subscribe((val) => (this.sortView = val));
    /*this.SortingService.onSortDate.subscribe((val) => {
      this.sort = val;
    });*/
    //this.SortingService.onSortView.subscribe((val) => (this.sortView = val));
    this.sortingService.filterWord
      .pipe(takeUntil(this.subscription$))
      .subscribe((val) => {
        if (val !== null) this.word = val;
      });
  }

  getCards() {
    /*this.subscription = this.YoutubeService.search(this.onChange).subscribe((val) => {
      this.cards = val;
      this.YoutubeService.resultsSearch.next(this.cards);
    });*/
    this.youtubeService.resultsSearch
      .pipe(takeUntil(this.subscription$))
      .subscribe((val) => (this.cards = val));
  }

  ngOnDestroy() {
    this.subscription$.next();
    this.subscription$.complete();
  }
}
