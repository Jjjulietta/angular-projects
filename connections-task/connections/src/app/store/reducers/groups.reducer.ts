import { createReducer, on } from '@ngrx/store';
import { GroupsActions } from '../actions/groups.action';
import { GroupsData } from '../store.model';

export const initialGroupsState: GroupsData = {
  isLoading: false,
  groups: null,
  error: null,
};

export const groupReducer = createReducer(
  initialGroupsState,
  on(GroupsActions.createGroup, (state, { name }) => ({
    ...state,
    isLoading: true,
  })),
  on(GroupsActions.getGroups, (state) => ({ ...state, isLoading: true })),
  on(GroupsActions.addGroup, (state, { group }) => ({
    ...state,
    isLoading: false,
    groups: state.groups ? state.groups?.concat(group) : null,
  })),
  on(GroupsActions.retrievedGroups, (state, { groups }) => ({
    ...state,
    isLoading: false,
    groups: groups,
  })),
  on(GroupsActions.getGroupsError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(GroupsActions.deleteGroup, (state, { groupId }) => ({
    ...state,
    groups: state.groups
      ? state.groups?.filter((item) => item.id !== groupId)
      : null,
  }))
);
