import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ErrorMessages } from 'src/app/models/toast.model';
import { HttpService } from 'src/app/services/http.service';
import { ConversationsActions } from '../actions/conversations.actions';

@Injectable()
export class ConversationsEffects {
  getConversations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationsActions.getConversations),
      mergeMap(() =>
        this.service.getConversations().pipe(
          map((val) => {
            return ConversationsActions.retrievedConversations({ items: val });
          }),
          catchError((error: ErrorMessages) =>
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
