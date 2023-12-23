import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { ConversationsActions } from '../actions/conversations.actions';

@Injectable()
export class CreateConversationEffect {
  createConversation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationsActions.createConversations),
      mergeMap(({ userId }) =>
        this.service.createConversation(userId).pipe(
          map((val) =>
            ConversationsActions.addConversations({ conversation: val })
          ),
          catchError((error) =>
            of(
              ConversationsActions.getConversationsError({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private service: HttpService) {}
}
