import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, of, exhaustMap, switchMap } from 'rxjs';
import { Group } from 'src/app/models/group.model';
import { HttpService } from 'src/app/services/http.service';
import { GroupsActions } from '../actions/groups.action';

@Injectable()
export class CreateGroupEffects {
  createGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.createGroup),
      mergeMap(({ name }) => {
        console.log('effect');
        return this.service.createGroup(name).pipe(
          map((val) => {
            console.log(val);
            const obj: Group = {
              id: val.id,
              name: name,
              createdAt: '',
              createdBy: '',
            };
            return GroupsActions.addGroup({ group: obj });
          }),
          catchError((error) =>
            of(GroupsActions.getGroupsError({ error: error.message }))
          )
        );
      })
    )
  );

  constructor(private actions$: Actions, private service: HttpService) {}
}