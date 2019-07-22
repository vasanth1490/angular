import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Store, select } from '@ngrx/store';
import * as fromSession from '../state/session.reducer';
import * as fromActions from '../state/session.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  isLoginError: boolean = false;
  showSpinner: boolean = false;
  loginErrMsg: string = "Invalid Credentials";
  constructor(private sessionService: SessionService, private router: Router,
    private dataService: DataService, private store: Store<fromSession.State>) { }

  ngOnInit() {
  }

  login() {
    this.showSpinner = true;

    this.store.dispatch(new fromActions.OnLogin({
      username: this.username,
      password: this.password
    }));

    this.store.pipe(select(fromSession.getSession)).subscribe(
      session => {
        this.showSpinner = false;
        console.log(session);
        this.router.navigate(['products']);
      }
    );  



    /* this.dataService.login(this.username, this.password).subscribe((data) => {
      console.log(data);
      if (data && data.length === 1) {
        this.sessionService.publishSessionData(data[0], true);
        this.router.navigate(['products']);
      } else {
        this.loginErrMsg = "Invalid Credentials";
        this.isLoginError = true;
      }
      this.showSpinner = false;
    },
      (error) => {
        console.log(error);
        this.loginErrMsg = "Something went wrong. Try again later.";
        this.isLoginError = true;
        this.showSpinner = false;
      }); */
  }

}