import { isNgTemplate } from '@angular/compiler';
import { ɵSSR_CONTENT_INTEGRITY_MARKER } from '@angular/core';
import { createReducer, on } from '@ngrx/store';
import { shareReplay } from 'rxjs';
import { Favorite } from 'src/app/youtube/models/search-item.model';
import { CardsApiActions } from '../actions/cards.actions';
import { AppState, YotubeResultsInterface } from '../state.models';

export const initialState: YotubeResultsInterface /*Pick<AppState, 'youtubeCards'>*/ =
  {
    isLoading: false,
    cards: { '0': [] },
    error: null,

    //youtubeCards: {},
  };

export const cardsReducer = createReducer(
  initialState,
  on(CardsApiActions.getCards, (state, action) => ({
    ...state,
    isLoading: true,
  })),
  on(CardsApiActions.retrievedCardsList, (state, { cards, token }) => ({
    ...state,
    isLoading: false,
    cards: { ...state.cards, [token]: cards },
  })),
  on(CardsApiActions.getCardsError, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(CardsApiActions.openCard, (state, { cardId, token }) => ({
    ...state,
    card: state.cards[token].find((item) => item.id === cardId),
  })),
  on(CardsApiActions.addFavoritCard, (state, { cardId, token }) => ({
    ...state,
    cards: Object.fromEntries(
      Object.entries(state.cards).map(([key, value]) => {
        console.log(token);
        if (key === token) {
          console.log(key);
          console.log(value);
          return [
            key,
            value
              .map((item) => ({ ...item }))
              .map((item) => {
                if (item.id === cardId) {
                  console.log(item.id);
                  return { ...item, favorite: Favorite.True };
                } else {
                  console.log(item.favorite);
                  return item;
                }
              }),
          ];
          //console.log([key, value]);
          //return [key, value];
        } else {
          console.log([key, value]);
          return [key, value];
        }
      })
    ),
    //state.youtubeCards,
    /*state.youtubeCards, ...state.youtubeCards[token]
      .map((item) => ({ ...item }))
      .map((item) => {
        if (item.id === cardId) {
          return { ...item, favorite: Favorite.True };
        } else {
          return item;
        }
      })*/

    /*.map((item) => ({ ...item }))
      .map((item) => {
        if (item.id === cardId) {
          return { ...item, favorite: Favorite.True };
        } else {
          return item;
        }
      }),*/
  })),
  on(CardsApiActions.removeFavoritCard, (state, { cardId, token }) => ({
    ...state,
    cards: Object.fromEntries(
      Object.entries(state.cards).map(([key, value]) => {
        console.log(token);
        if (key === token) {
          return [
            key,
            value
              .map((item) => ({ ...item }))
              .map((item) => {
                if (item.id === cardId) {
                  return { ...item, favorite: Favorite.False };
                }
                return item;
              }),
          ];
        }
        return [key, value];
      })
    ),
    /*state.youtubeCards,
    ...state.youtubeCards[token]
      .map((item) => ({ ...item }))
      .map((item) => {
        if (item.id === cardId) {
          return { ...item, favorite: Favorite.True };
        } else {
          return item;
        }
      }),*/
    /*youtubeCards: state.youtubeCards
      .map((item) => ({ ...item }))
      .map((item) => {
        if (item.id === cardId) {
          return { ...item, favorite: Favorite.False };
        } else {
          return item;
        }
      }),*/
  }))
);
