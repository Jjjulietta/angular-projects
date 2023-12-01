import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/login.model.ts';
import { UserActions } from '../actions/user.actions';
import { AppState, UserData } from '../store.model';

export const initialState: UserData = {
  isLoading: false,
  authUser: null,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.addUser, (state, { user }) => ({ ...state, user })),
  on(UserActions.updateUser, (state, { name }) => ({
    ...state,
    user: Object.defineProperty(state.authUser, 'name', { value: name }),
  })),
  on(UserActions.getUser, (state, action) => ({ ...state, isLoading: true })),
  on(UserActions.retrievedUser, (state, { user }) => ({
    ...state,
    isLoading: false,
    authUser: user,
  })),
  on(UserActions.getUserError, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
