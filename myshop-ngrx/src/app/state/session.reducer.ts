import { SessionActions, SessionActionTypes } from './session.actions';
import * as fromRoot from './app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSession from '../state/session.reducer';
import { User } from '../models/user';

export interface SessionState {
  isLoggedIn: boolean;
  user: User;
  loginErrMsg: string;
  isLoginError: boolean;
}

export interface State extends fromRoot.State {
  session: SessionState
}

// Selector functions
const getSessionState = createFeatureSelector<fromSession.SessionState>('session');

export const getSession = createSelector(
    getSessionState,
    state => state
);

const initialSessionState: SessionState = {
  isLoggedIn: false,
  user: null,
  loginErrMsg: null,
  isLoginError: false
};

export function sessionReducer(state = initialSessionState, action: SessionActions) {
  switch (action.type) {
    case SessionActionTypes.OnLoginSuccess: 
      console.log(action.payload);
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
      }
    case SessionActionTypes.OnLoginFailure:
    case SessionActionTypes.OnLogout:
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
    default:
      return state;
  }
}