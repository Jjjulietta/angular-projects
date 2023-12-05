import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { on } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { ConversationsActions } from '../actions/conversations.actions';

@Injectable()
export class ConversationsEffects {
  getConversations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationsActions.getConversations),
      mergeMap(() =>
        this.service.getConversations().pipe(
          map((val) =>
            ConversationsActions.retrievedConversations({ items: val })
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
