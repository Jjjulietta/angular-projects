import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  exhaustMap,
  map,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';
import { CardsApiActions } from '../actions/cards.actions';

@Injectable()
export class CardsEffects {
  getCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardsApiActions.getCards),
      mergeMap(({ search, num, token }) => {
        console.log(search);
        console.log(token);
        return this.service.getSearchData(search, num).pipe(
          debounceTime(600),
          distinctUntilChanged(),
          map((cards) => {
            this.service.resultSearch$ = cards;
            return CardsApiActions.retrievedCardsList({ cards, token });
          }),
          catchError((error) =>
            of(CardsApiActions.getCardsError({ error: error.message }))
          )
        );
      })
    )
  );

  constructor(private actions$: Actions, private service: YoutubeService) {}
}
