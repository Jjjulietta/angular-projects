import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessagesData } from '../store.model';

export const selectMessagesData =
  createFeatureSelector<MessagesData>('messages');

export const selectMessages = createSelector(
  selectMessagesData,
  (s1) => s1.messages
);

export const selectMessageError = createSelector(
  selectMessagesData,
  (s1) => s1.error
);
