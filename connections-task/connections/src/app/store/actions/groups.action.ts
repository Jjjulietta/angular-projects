import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Group } from 'src/app/models/group.model';

export const GroupsActions = createActionGroup({
  source: 'groups',
  events: {
    'Create Group': props<{ name: string }>(),
    'Add Group': props<{ group: Group }>(),
    'Get Groups': emptyProps(),
    'Retrieved Groups': props<{ groups: Group[] }>(),
    'Get Groups Error': props<{ error: string }>(),
    'Delete Group': props<{ groupId: string }>(),
  },
});
