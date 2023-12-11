import { createReducer, on, Store } from '@ngrx/store';
import { UserModelTwo } from 'src/app/models/people.model';
import { PeopleActions } from '../actions/people.actions';
import { PeopleData } from '../store.model';

export const initialPeopleState: PeopleData = {
  isLoading: false,
  people: null,
  error: null,
  names: null,
};

export const PeopleReducer = createReducer(
  initialPeopleState,
  on(PeopleActions.getPeople, (state) => ({ ...state, isLoading: true })),
  on(PeopleActions.retrievedPeople, (state, { users }) => ({
    ...state,
    isLoading: false,
    people: users,
    names: users.reduce((acc: UserModelTwo, item) => {
      acc[item.id] = item.name;
      return acc;
    }, {}),
    /*names: users.map((item) => {
      const id = item.id;
      const name = item.name;
      return { [id]: { name } };
    }),*/
  })),
  on(PeopleActions.getPeopleError, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
