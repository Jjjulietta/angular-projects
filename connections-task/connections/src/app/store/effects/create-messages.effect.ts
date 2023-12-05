import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { MessagesActions } from '../actions/messages.actions';

@Injectable()
export class CreateMessagesEffect {
  constructor(private actions$: Actions, private service: HttpService) {}
}
