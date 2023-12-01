import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/models/login.model.ts';
import { AppState, UserData } from '../store.model';

export const selectUser = createFeatureSelector<UserData>('user');

export const selectUserData = createSelector(selectUser, (s1) => s1.authUser);
