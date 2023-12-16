import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';
import { ToastMessage, ToastState } from 'src/app/models/toast.model';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserActions } from '../actions/user.actions';

@Injectable()
export class UpdateUserEffects {
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      exhaustMap(({ name }) =>
        this.service.updateUser(name).pipe(
          map((val) => {
            if (val.ok) {
              this.toast.showToast(
                ToastMessage.SucsessUpdateUserName,
                ToastState.Sucsess
              );
            }
            console.log(val);
            return UserActions.updateUser({ name });
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
