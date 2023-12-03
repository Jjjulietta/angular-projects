import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, of, exhaustMap, switchMap } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { GroupsActions } from '../actions/groups.action';

@Injectable()
export class GroupsEffects {
  getGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupsActions.getGroups),
      mergeMap(() => {
        console.log('effect');
        return this.service.getGroups().pipe(
          map((val) => {
            console.log(val);
            return GroupsActions.retrievedGroups({ groups: val });
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
