import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, PeopleData } from '../store.model';

export const selectPeopleData = createFeatureSelector<PeopleData>('people');
export const selectPeople = createSelector(selectPeopleData, (s1) => s1.people);
export const selectUsers = createSelector(selectPeopleData, (s1) => s1.names);
