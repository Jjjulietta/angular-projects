import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserModel } from 'src/app/models/people.model';

export const PeopleActions = createActionGroup({
  source: 'people',
  events: {
    'Get People': emptyProps(),
    'Retrieved People': props<{ users: UserModel[] }>(),
    'Get People Error': props<{ error: string }>(),
  },
});
