import { createActionGroup, props } from '@ngrx/store';
import { Conversation, Message } from 'src/app/models/conversation.model';

export const MessagesActions = createActionGroup({
  source: 'messages',
  events: {
    'Create Messages': props<{
      userId: string;
      token: string;
      date: number;
    }>(),
    'Add Messages': props<{
      userId: string;
      messages: Message[] /*conversation: Message */;
    }>(),
    'Update Messages': props<{ userId: string; token: string; date: number }>(),
    'Get Messages': props<{ userId: string; token: string; date?: number }>(),
    'Retrieved Messages': props<{ userId: string; messages: Message[] }>(),
    'Get Messages Error': props<{ error: string }>(),
  },
});
