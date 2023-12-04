import { createReducer, on } from '@ngrx/store';
import { PeopleActions } from '../actions/people.actions';
import { PeopleData } from '../store.model';

export const initialPeopleState: PeopleData = {
  isLoading: false,
  people: null,
  error: null,
};

export const PeopleReducer = createReducer(
  initialPeopleState,
  on(PeopleActions.getPeople, (state) => ({ ...state, isLoading: true })),
  on(PeopleActions.retrievedPeople, (state, { users }) => ({
    ...state,
    isLoading: false,
    people: users,
  })),
  on(PeopleActions.getPeopleError, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
