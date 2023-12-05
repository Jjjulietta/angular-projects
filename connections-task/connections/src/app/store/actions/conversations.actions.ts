import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Conversation, Message } from 'src/app/models/conversation.model';

export const ConversationsActions = createActionGroup({
  source: 'conversations',
  events: {
    'Create Conversations': props<{ userId: string }>(),
    'Add Conversations': props<{ conversation: Conversation }>(),
    'Get Conversations': emptyProps,
    'Retrieved Conversations': props<{ items: Conversation[] }>(),
    'Get Conversations Error': props<{ error: string }>(),
  },
});
