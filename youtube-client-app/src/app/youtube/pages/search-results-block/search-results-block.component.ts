import { Component } from '@angular/core';
import { SearchCards } from '../../models/search-item.model';
import { SortingService } from '../../../core/services/sorting.service';
import { YoutubeService } from '../../services/youtube.service';
import { SortType } from '../../../core/enums/sort-type';
import { Observable, takeUntil } from 'rxjs';
import { UnsubscribeService } from 'src/app/core/services/unsubscribe.service';
import { Store } from '@ngrx/store';
import {
  selectAllCards,
  selectCards,
  selectCustomLength,
  selectPageNumber,
} from 'src/app/redux/selectors/cards.selector';
import {
  CardsApiActions,
  cardsListsActions,
} from 'src/app/redux/actions/cards.actions';

@Component({
  selector: 'app-search-results-block',
  templateUrl: './search-results-block.component.html',
  styleUrls: ['./search-results-block.component.scss'],
})
export class SearchResultsBlockComponent {
  cards$?: Observable<SearchCards[]>; //= this.store.select(selectAllCards);
  cards: SearchCards[] = [];
  pageNumber$ = this.store.select(selectPageNumber);
  sort: SortType | string = SortType.Default;
  sortView: SortType = SortType.Default;
  word: string | null = null;
  currentPage: number = 1;
  cachingPage: string[] = []; //JSON.parse(localStorage.getItem('cachingPage'));
  search?: string;

  constructor(
    private sortingService: SortingService,
    private youtubeService: YoutubeService,
    private unsubscribe$: UnsubscribeService,
    private store: Store
  ) {}

  ngOnInit() {
    this.pageNumber$.pipe(takeUntil(this.unsubscribe$)).subscribe((val) => {
      this.currentPage = Number(val);
    });
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

  /*ngOnChange() {
    this.getCards();
  }*/

  getCards() {
    this.pageNumber$.pipe(takeUntil(this.unsubscribe$)).subscribe((val) => {
      this.currentPage = Number(val);
      //console.log(this.currentPage);
      if (this.currentPage === 1) {
        //console.log(this.currentPage);
        this.cards$ = this.store.select(selectAllCards);
        this.cards$.pipe(takeUntil(this.unsubscribe$)).subscribe((val) => {
          this.cards = [...val].sort((a, b) => (a.link ? 1 : b.link ? 1 : 0));
          //console.log(this.cards);
        });
      } else {
        //console.log(this.currentPage);
        this.cards$ = this.store.select(selectCards);
        this.cards$
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((val) => (this.cards = [...val]));
        this.cards$
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((val) => console.log(val));
      }
    });
  }

  changePage(page: number) {
    //console.log(page);
    //console.log(this.currentPage);
    if (localStorage.getItem('cachingPage')) {
      const obj = localStorage.getItem('cachingPage');
      if (obj !== null) this.cachingPage = JSON.parse(obj);
    }
    if (!this.cachingPage.includes(this.currentPage.toString())) {
      //console.log(this.currentPage);
      this.cachingPage.push(this.currentPage.toString());
      localStorage.setItem('cachingPage', JSON.stringify(this.cachingPage));
    }
    //console.log(this.cachingPage);
    this.currentPage = page;
    //console.log(this.currentPage);
    this.store.dispatch(
      cardsListsActions.changePage({ token: this.currentPage.toString() })
    );
    this.search = sessionStorage.getItem('search')?.toString();
    //this.pageNumber$ = this.store.select(selectPageNumber).pipe(takeUntil(this.unsubscribe$))
    if (this.search) {
      if (this.cachingPage.includes(this.currentPage.toString())) {
        console.log(this.cachingPage);
        console.log(this.currentPage);
        this.getCards();
      } else {
        this.cachingPage.push(this.currentPage.toString());
        localStorage.setItem('cachingPage', JSON.stringify(this.cachingPage));
        this.store.dispatch(
          CardsApiActions.getCards({
            search: this.search,
            num: undefined,
            token: this.currentPage.toString(),
          })
        );
        this.getCards();
      }
    }
  }
}
