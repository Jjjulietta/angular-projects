import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, of, exhaustMap, switchMap } from 'rxjs';
import { Group } from 'src/app/models/group.model';
import { AuthUser } from 'src/app/models/login.model.ts';
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
            const str = localStorage.getItem('authUser');
            let arr: Group[] | [] = [];
            if (str !== null) {
              const obj: AuthUser = JSON.parse(str);
              const id = obj.uid;
              arr = [...val]
                //.map((item) => ({ ...item }))
                .map((item) => {
                  if (item.createdBy === id) {
                    return { ...item, myGroup: 'true' };
                  }
                  return item;
                });
              console.log(id);
            }
            return GroupsActions.retrievedGroups({ groups: arr });
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
