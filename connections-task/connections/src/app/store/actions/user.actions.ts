import { createActionGroup, props } from '@ngrx/store';
import { AuthUser, User } from 'src/app/models/login.model.ts';

export const UserActions = createActionGroup({
  source: 'user',
  events: {
    'Add User': props<{ user: AuthUser }>(),
    'Update User': props<{ name: string }>(),
    'Get User': props<{ user: AuthUser }>(),
    'Retrieved User': props<{ user: User }>(),
    'Get User Error': props<{ error: string }>(),
  },
});
