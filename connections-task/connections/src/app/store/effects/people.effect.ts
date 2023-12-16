import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { AuthUser } from 'src/app/models/login.model.ts';
import { UserModel } from 'src/app/models/people.model';
import {
  ErrorMessages,
  ToastMessage,
  ToastState,
} from 'src/app/models/toast.model';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import { PeopleActions } from '../actions/people.actions';

@Injectable()
export class PeopleEffects {
  getPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeopleActions.getPeople),
      mergeMap(() => {
        return this.service.getPeople().pipe(
          map((val) => {
            const str = localStorage.getItem('authUser');
            let arr: UserModel[] | [] = [];
            if (str !== null) {
              const obj: AuthUser = JSON.parse(str);
              const id = obj.uid;
              arr = [...val].filter((item) => item.id !== id);
              console.log(id);
            }
            this.toast.showToast(
              ToastMessage.SucsessUpdatePeople,
              ToastState.Sucsess
            );
            return PeopleActions.retrievedPeople({ users: arr });
          }),
          catchError((error: ErrorMessages) =>
            of(PeopleActions.getPeopleError({ error: error.message }))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private service: HttpService,
    private toast: ToastService
  ) {}
}
