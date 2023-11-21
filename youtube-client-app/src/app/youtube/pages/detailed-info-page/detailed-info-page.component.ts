import { Location } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { UnsubscribeService } from 'src/app/core/services/unsubscribe.service';
import { CardsApiActions } from 'src/app/redux/actions/cards.actions';
import {
  selectCard,
  selectPageNumber,
} from 'src/app/redux/selectors/cards.selector';
import {
  Favorite,
  SearchCards,
} from 'src/app/youtube/models/search-item.model';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';
import { Options } from '../../models/option.model';

@Component({
  selector: 'app-detailed-info-page',
  templateUrl: './detailed-info-page.component.html',
  styleUrls: ['./detailed-info-page.component.scss'],
})
export class DetailedInfoPageComponent {
  route = inject(ActivatedRoute);
  youtubeServices = inject(YoutubeService);
  card?: SearchCards;
  card$ = this.store.select(selectCard);
  favorite: Favorite = this.route.snapshot.params['favorite'];
  custom: string = 'Add favorite';
  date?: string;

  constructor(
    private router: Router,
    private location: Location,
    private store: Store,
    private unsubscribe$: UnsubscribeService
  ) {
    const cardId = this.route.snapshot.params['id'];
    console.log(cardId);
    //this.card = this.youtubeServices.getResultById(cardId);
    this.store
      .select(selectCard)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => {
        this.card = val;
        this.getDateById();
      });
    console.log(this.card);
    if (this.card) this.date = this.youtubeServices.getDateById(cardId);
    console.log(this.date);
  }

  getDateById() {
    if (this.card && this.card.date !== null) {
      const year = new Date(this.card.date).getFullYear();
      const month = new Date(this.card.date).getMonth();
      const day = new Date(this.card.date).getDate();
      const weekday = new Date(this.card.date).getDay();
      let options: Options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
    }
  }
  /*onInit() {
    this.store
      .select(selectCard)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => (this.card = val));
  }*/

  changeFavorite() {
    if (this.favorite === 'false') {
      this.favorite = Favorite.True;
      //this.card.id !== null
      this.store
        .select(selectPageNumber)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((val) => {
          if (this.card && this.card.id !== null)
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
          if (this.card && this.card.id !== null)
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

  back() {
    this.location.back();
    //this.router.navigate(['']);
  }
}
