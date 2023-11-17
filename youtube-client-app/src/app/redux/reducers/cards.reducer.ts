import { createReducer, on } from '@ngrx/store';
import { Favorite } from 'src/app/youtube/models/search-item.model';
import { CardsApiActions } from '../actions/cards.actions';
import { AppState } from '../state.models';

export const initialState: Pick<AppState, 'youtubeCards'> = {
  youtubeCards: [],
};

export const cardsReducer = createReducer(
  initialState,
  on(CardsApiActions.retrievedCardsList, (state, { cards }) => ({
    ...state,
    youtubeCards: [...cards],
  })),
  on(CardsApiActions.addFavoritCard, (state, { cardId }) => ({
    ...state,
    youtubeCards: state.youtubeCards
      .map((item) => ({ ...item }))
      .map((item) => {
        if (item.id === cardId) {
          return { ...item, favorite: Favorite.True };
        } else {
          return item;
        }
      }),
  })),
  on(CardsApiActions.removeFavoritCard, (state, { cardId }) => ({
    ...state,
    youtubeCards: state.youtubeCards
      .map((item) => ({ ...item }))
      .map((item) => {
        if (item.id === cardId) {
          return { ...item, favorite: Favorite.False };
        } else {
          return item;
        }
      }),
  }))
);
