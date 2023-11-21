import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { UnsubscribeService } from 'src/app/core/services/unsubscribe.service';
import {
  CardsApiActions,
  CustomCardsActions,
} from 'src/app/redux/actions/cards.actions';
import { selectPageNumber } from 'src/app/redux/selectors/cards.selector';
import {
  Favorite,
  SearchCards,
} from 'src/app/youtube/models/search-item.model';

@Component({
  selector: 'app-search-results-item',
  templateUrl: './search-results-item.component.html',
  styleUrls: ['./search-results-item.component.scss'],
})
export class SearchResultsItemComponent {
  @Input() card!: SearchCards;
  @Input() cards!: SearchCards[];
  pageNumber$ = this.store.select(selectPageNumber);
  pageNumber!: string;
  favorite: Favorite = Favorite.False;
  custom: string = 'favorite video';

  date!: string | Date;

  constructor(
    private router: Router,
    private store: Store,
    private unsubscribe$: UnsubscribeService
  ) {}
  ngOnInit() {
    this.store
      .select(selectPageNumber)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => (this.pageNumber = val));
    if (this.card?.date && this.card.date !== null) this.date = this.card?.date;
    if (this.card?.favorite) this.favorite = this.card?.favorite;
  }

  openCard() {
    console.log(this.card?.id);
    console.log(this.pageNumber);
    if (this.card.id) {
      console.log(this.pageNumber);
      this.store.dispatch(
        CardsApiActions.openCard({
          cardId: this.card.id,
          token: this.pageNumber,
        })
      );
      this.router.navigate([
        `detailed/${this.card?.id}`,
        { favorite: this.favorite },
      ]);
    }
  }

  removeCard(cardId: string) {
    this.store.dispatch(CustomCardsActions.removeCard({ cardId }));
  }

  changeFavorite() {
    if (this.favorite === 'false') {
      this.favorite = Favorite.True;
      //this.card.id !== null
      this.store
        .select(selectPageNumber)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((val) => {
          if (this.card.id !== null)
            this.store.dispatch(
              CardsApiActions.addFavoritCard({
                cardId: this.card?.id,
                token: val,
              })
            );
        });

      this.custom = 'remove favorite';
    } else if (this.favorite === 'true') {
      this.favorite = Favorite.False;
      this.store
        .select(selectPageNumber)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((val) => {
          if (this.card.id !== null)
            this.store.dispatch(
              CardsApiActions.removeFavoritCard({
                cardId: this.card?.id,
                token: val,
              })
            );
        });
      this.custom = 'add favorite';
    }
  }
}
