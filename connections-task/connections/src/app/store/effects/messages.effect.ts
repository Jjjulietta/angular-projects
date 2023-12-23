import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  ErrorMessages,
  ToastMessage,
  ToastState,
} from 'src/app/models/toast.model';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import { MessagesActions } from '../actions/messages.actions';

@Injectable()
export class MessagesEffect {
  getMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.getMessages),
      mergeMap(({ userId, token, date }) =>
        this.service.getMessages(userId, token, date).pipe(
          map((val) => {
            let arr = val.slice(0);
            arr.sort((a, b) => +a.createdAt - +b.createdAt);
            this.toast.showToast(
              ToastMessage.SucsessUpdateMessages,
              ToastState.Sucsess
            );
            return MessagesActions.retrievedMessages({ userId, messages: arr });
          }),
          catchError((error: ErrorMessages) =>
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
