import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { UserActions } from '../actions/user.actions';

@Injectable()
export class UpdateUserEffects {
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(({ name }) =>
        this.service.updateUser(name).pipe(
          map((val) => UserActions.retrievedUser({ user: val })),
          catchError((error) =>
            of(UserActions.getUserError({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private service: HttpService) {}
}
