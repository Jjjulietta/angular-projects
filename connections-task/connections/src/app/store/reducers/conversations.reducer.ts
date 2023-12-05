import { createReducer, on } from '@ngrx/store';
import { ConversationsActions } from '../actions/conversations.actions';
import { ConversationsData, MessagesData } from '../store.model';

export const initialConversationState: ConversationsData = {
  isLoading: false,
  conversations: null,
  error: null,
};

export const conversationsReducer = createReducer(
  initialConversationState,
  on(ConversationsActions.getConversations, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ConversationsActions.retrievedConversations, (state, { items }) => ({
    ...state,
    isLoading: false,
    conversations: items,
  })),
  on(ConversationsActions.getConversationsError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(ConversationsActions.createConversations, (state, { userId }) => ({
    ...state,
    isLoading: true,
  })),
  on(ConversationsActions.addConversations, (state, { conversation }) => ({
    ...state,
    isLoading: false,
    conversations: state.conversations
      ? state.conversations?.concat(conversation)
      : null,
  }))
);
