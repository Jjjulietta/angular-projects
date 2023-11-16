import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Subject,
  takeUntil,
} from 'rxjs';
import { CardsApiActions } from 'src/app/redux/actions/cards.actions';
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
  //subscription$ = new Subject<void>();
  /*searchForm: FormGroup = new FormGroup({
    search: new FormControl(''),
  });*/
  constructor(
    private unsubscribe$: UnsubscribeService,
    private youtubeService: YoutubeService,
    private store: Store
  ) {}

  ngOnInit() {}

  onChange() {
    if (this.search.length > 3) {
      this.youtubeService
        .getSearchData(this.search)
        .pipe(
          takeUntil(this.unsubscribe$),
          debounceTime(600),
          distinctUntilChanged()
        )
        .subscribe((val) => {
          console.log(val);
          this.youtubeService.resultSearch$ = val;
          this.store.dispatch(
            CardsApiActions.retrievedCardsList({ cards: val })
          );
        });
    }
  }

  /*ngOnDestroy() {
    this.subscription$.next();
    this.subscription$.complete();
  }*/
}
