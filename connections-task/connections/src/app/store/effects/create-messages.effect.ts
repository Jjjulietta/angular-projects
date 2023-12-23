import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { MessagesActions } from '../actions/messages.actions';

@Injectable()
export class CreateMessagesEffect {
  addMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.createMessages),
      mergeMap(({ userId, token, date }) =>
        this.service.getMessages(userId, token, date).pipe(
          map((val) => MessagesActions.addMessages({ userId, messages: val })),
          catchError((error) =>
            of(MessagesActions.getMessagesError({ error: error.message }))
          )
        )
      )
    )
  );
  constructor(private actions$: Actions, private service: HttpService) {}
}
