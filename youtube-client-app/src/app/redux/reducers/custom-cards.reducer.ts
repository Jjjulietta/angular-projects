import { createReducer, on } from '@ngrx/store';
import { CustomCardsActions } from '../actions/cards.actions';
import { AppState } from '../state.models';

export const initialState: Pick<AppState, 'customCards'> = {
  customCards: [],
};

export const customCardsReducer = createReducer(
  initialState,
  on(CustomCardsActions.addCard, (state, { card }) => ({
    ...state,
    customCards: [...state.customCards, card],
  })),
  on(CustomCardsActions.removeCard, (state, { cardId }) => ({
    ...state,
    customCards: state.customCards.filter((item) => item.id != cardId),
  }))
);
