import { createReducer, on } from '@ngrx/store';
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
  }))
);
