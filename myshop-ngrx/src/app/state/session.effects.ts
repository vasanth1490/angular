import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { DataService } from '../data.service';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as sessionActions from './session.actions';
import { UserWithCred } from '../models/user-with-cred';
import { User } from '../models/user';

@Injectable()
export class SessionEffects {

  constructor(private dataService: DataService,
              private actions$: Actions) { }

  @Effect()
  OnLogin$: Observable<Action> = this.actions$.pipe(
    ofType(sessionActions.SessionActionTypes.OnLogin),
    map((action: sessionActions.OnLogin) => action.payload),
    mergeMap((cred: UserWithCred) =>
      this.dataService.login(cred.username, cred.password).pipe(
        map((users: User[]) => {
          console.log(users);
          if(users && users.length === 1) {
            return new sessionActions.OnLoginSuccess(users[0])
          } else {
            return new sessionActions.OnLoginFailure()
          }
        }),
        catchError(err => of(new sessionActions.OnLoginFailure()))
      )
    )
  );
}
