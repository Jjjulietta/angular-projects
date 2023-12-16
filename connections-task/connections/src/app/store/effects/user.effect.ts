import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ToastMessage, ToastState } from 'src/app/models/toast.model';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserActions } from '../actions/user.actions';

@Injectable()
export class UserEffects {
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUser),
      mergeMap(({ user }) =>
        this.service.getUser(user).pipe(
          map((val) => {
            return UserActions.retrievedUser({ user: val });
          }),
          catchError((error) =>
            of(UserActions.getUserError({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: HttpService,
    private toast: ToastService
  ) {}
}
