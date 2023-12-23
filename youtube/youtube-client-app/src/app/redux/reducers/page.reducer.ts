import { createReducer, on } from '@ngrx/store';
import { cardsListsActions } from '../actions/cards.actions';
import { AppState } from '../state.models';

export const initialState: Pick<AppState, 'cardsPage'> = {
  cardsPage: '1',
};

export const PageReducer = createReducer(
  initialState,
  on(cardsListsActions.changePage, (state, { token }) => ({
    ...state,
    cardsPage: token,
  }))
);
