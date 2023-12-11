import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
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
            return MessagesActions.retrievedMessages({ userId, messages: arr });
          }),
          catchError((error) =>
            of(MessagesActions.getMessagesError({ error: error.message }))
          )
        )
      )
    )
  );
  constructor(private actions$: Actions, private service: HttpService) {}
}
