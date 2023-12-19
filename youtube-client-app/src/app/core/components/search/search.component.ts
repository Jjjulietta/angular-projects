import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Subject,
  takeUntil,
} from 'rxjs';
import {
  CardsApiActions,
  cardsListsActions,
} from '../../../redux/actions/cards.actions';
import {
  selectCards,
  selectCustomLength,
  selectLoadingPages,
  selectPageNumber,
  selectYoutubeCards,
} from 'src/app/redux/selectors/cards.selector';
import { SearchItemVideo } from 'src/app/youtube/models/search-item.model';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';
import { UnsubscribeService } from '../../services/unsubscribe.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public inputText: string | null = null;
  search: string = '';
  customCardsQuantity$ = this.store.select(selectCustomLength);
  customCardsQuantity!: number;
  pageNumber$ = this.store.select(selectPageNumber);
  pageNumber!: string;
  youtubeCards$ = this.store.select(selectYoutubeCards);
  constructor(
    private unsubscribe$: UnsubscribeService,
    private youtubeService: YoutubeService,
    private store: Store
  ) {}

  ngOnInit() {}

  onChange() {
    this.store.dispatch(CardsApiActions.removeCards());
    this.youtubeService.submit$ = this.search;
    sessionStorage.setItem('search', this.search);
    console.log(this.search);
    this.store.dispatch(cardsListsActions.changePage({ token: '1' }));
    if (this.search.length > 3) {
      localStorage.setItem('cachingPage', JSON.stringify(['1']));
      this.store.dispatch(
        CardsApiActions.getCards({
          search: this.search,
          //num: value,
          token: '1',
        })
      );
    }
  }
}

/*
          this.youtubeService
            .getSearchData(this.search, value)
            .pipe(
              takeUntil(this.unsubscribe$),
              debounceTime(600),
              distinctUntilChanged()
            )
            .subscribe((val) => {
              console.log(val);
              this.youtubeService.resultSearch$ = val;
              this.pageNumber$
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe((v) =>
                  this.store.dispatch(
                    CardsApiActions.retrievedCardsList({
                      cards: val,
                      token: v.toString(),
                    })
                  )
                );
            })*/

/*ngOnDestroy() {
    this.subscription$.next();
    this.subscription$.complete();
  }*/
