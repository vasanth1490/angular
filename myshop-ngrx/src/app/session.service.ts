import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Session } from './models/session';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionSubject: Subject<Session> = new Subject<Session>();
  private sessionObs: Observable<Session> = this.sessionSubject.asObservable();
  constructor() { }

  public getSessionObservable(): Observable<Session> {
    return this.sessionObs;
  }

  public publishSessionData(loggedInUser: User, isLoggedIn: boolean): void {
    let sessionObj: Session = {
      isLoggedIn :isLoggedIn,
      user: loggedInUser
    }
    this.sessionSubject.next(sessionObj);
  }

}