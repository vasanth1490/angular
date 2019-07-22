/* NgRx */
import { Action } from '@ngrx/store';
import { UserWithCred } from '../models/user-with-cred';
import { User } from '../models/user';

export enum SessionActionTypes {
  OnLogin = '[Session] On Login',
  OnLoginSuccess = '[Session] On Login Success',
  OnLoginFailure = '[Session] On Login Failure',
  OnLogout = '[Session] On Logout'
}

// Action Creators
export class OnLoginSuccess implements Action {
  readonly type = SessionActionTypes.OnLoginSuccess;
  constructor(public payload: User) { }
}

export class OnLogin implements Action {
  readonly type = SessionActionTypes.OnLogin;
  constructor(public payload: UserWithCred) { }
}

export class OnLoginFailure implements Action {
  readonly type = SessionActionTypes.OnLoginFailure;
}

export class OnLogout implements Action {
  readonly type = SessionActionTypes.OnLogout;
}

// Union the valid types
export type SessionActions = OnLoginSuccess | OnLogin | OnLoginFailure | OnLogout;

