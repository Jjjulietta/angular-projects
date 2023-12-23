import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ToastMessage, ToastState } from 'src/app/models/toast.model';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import { MessagesActions } from '../actions/messages.actions';

@Injectable()
export class UpdateMessagesEffect {
  updateMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.updateMessages),
      mergeMap(({ userId, token, date }) =>
        this.service.getMessages(userId, token, date).pipe(
          map((val) => {
            this.toast.showToast(
              ToastMessage.SucsessUpdateMessages,
              ToastState.Sucsess
            );
            return MessagesActions.addMessages({ userId, messages: val });
          }),
          catchError((error) =>
            of(MessagesActions.getMessagesError({ error: error.message }))
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
