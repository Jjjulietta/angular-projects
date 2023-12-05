import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupsData } from '../store.model';

export const selectGroupsData = createFeatureSelector<GroupsData>('groups');

export const selectGroups = createSelector(selectGroupsData, (s1) => s1.groups);
export const selectErrorGroup = createSelector(
  selectGroupsData,
  (s1) => s1.error
);
