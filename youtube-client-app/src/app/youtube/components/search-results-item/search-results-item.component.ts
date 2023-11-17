import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  CardsApiActions,
  CustomCardsActions,
} from 'src/app/redux/actions/cards.actions';
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
  favorite: Favorite = Favorite.False;
  custom: string = 'favorite video';

  date!: string | Date;

  constructor(private router: Router, private store: Store) {}
  ngOnInit() {
    if (this.card?.date && this.card.date !== null) this.date = this.card?.date;
    if (this.card?.favorite) this.favorite = this.card?.favorite;
  }

  openCard() {
    console.log(this.card?.id);
    this.router.navigate([`detailed/${this.card?.id}`]);
  }

  removeCard(cardId: string) {
    this.store.dispatch(CustomCardsActions.removeCard({ cardId }));
  }

  changeFavorite() {
    if (this.favorite === 'false') {
      this.favorite = Favorite.True;
      this.card.id !== null
        ? this.store.dispatch(
            CardsApiActions.addFavoritCard({
              cardId: this.card?.id,
            })
          )
        : undefined;
      this.custom = 'remove favorite';
    } else if (this.favorite === 'true') {
      this.favorite = Favorite.False;
      this.card.id !== null
        ? this.store.dispatch(
            CardsApiActions.removeFavoritCard({
              cardId: this.card?.id,
            })
          )
        : undefined;
      this.custom = 'add favorite';
    }
  }
}
