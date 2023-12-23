import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConversationsData } from '../store.model';
import { selectPeople } from './people.selectors';

export const selectConversationsData =
  createFeatureSelector<ConversationsData>('conversations');

export const selectConversations = createSelector(
  selectConversationsData,
  (s1) => s1.conversations
);

export const selectconversationsError = createSelector(
  selectConversationsData,
  (s1) => s1.error
);

export const selectUserId = createSelector(selectConversationsData, (s1) =>
  s1.conversations?.map((item) => item.companionID)
);

export const selectCompanions = createSelector(
  selectUserId,
  selectPeople,
  (s1, s2) => s2?.filter((item) => s1?.includes(item.id))
);

export const selectPeopleAuther = createSelector(
  selectUserId,
  selectPeople,
  (s1, s2) => s2?.filter((item) => !s1?.includes(item.id))
);
