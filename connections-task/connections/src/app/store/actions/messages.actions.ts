import { createActionGroup, props } from '@ngrx/store';
import { Conversation, Message } from 'src/app/models/conversation.model';

export const MessagesActions = createActionGroup({
  source: 'messages',
  events: {
    'Create Messages': props<{ userId: string; message: string }>(),
    'Add Messages': props<{ userId: string; conversation: Message }>(),
    'Get Messages': props<{ userId: string; date?: number }>(),
    'Retrieved Messages': props<{ userId: string; messages: Message[] }>(),
    'Get Messages Error': props<{ error: string }>(),
  },
});
