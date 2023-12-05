import { createReducer, on } from '@ngrx/store';
import { MessagesActions } from '../actions/messages.actions';
import { MessagesData } from '../store.model';

export const initialMessagesState: MessagesData = {
  isLoading: false,
  messages: null,
  error: null,
};

export const messagesReducer = createReducer(
  initialMessagesState,
  on(MessagesActions.getMessages, (state, { userId }) => ({
    ...state,
    isLoading: true,
  })),
  on(MessagesActions.retrievedMessages, (state, { userId, messages }) => ({
    ...state,
    isLoading: false,
    messages: { ...state.messages, [userId]: messages },
  })),
  on(MessagesActions.getMessagesError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(MessagesActions.createMessages, (state, { userId, message }) => ({
    ...state,
    isLoading: true,
  })),
  on(MessagesActions.addMessages, (state, { userId, conversation }) => ({
    ...state,
    isLoading: false,
    messages: state.messages
      ? Object.fromEntries(
          Object.entries(state.messages).map(([key, value]) => {
            if (key === userId) {
              return [key, value.push(conversation)];
            } else {
              return [key, value];
            }
          })
        )
      : { [userId]: conversation },
  }))
);
