import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { User } from '../models/user';
import { Cart } from '../models/cart';
import { Session } from '../models/session';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Store, select } from '@ngrx/store';
import * as fromSession from '../state/session.reducer';
import * as fromActions from '../state/session.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  defaultSession: Session = {
    user: {},
    isLoggedIn: false
  };
  currentSession: Session = this.defaultSession;
  isLoggedIn: boolean = false;
  defaultUsername: string = 'Guest';
  cartCount: number = 0;

  sessionObj = {};

  constructor(private sessionService: SessionService, private router: Router, 
  private cartService: CartService, private store: Store<fromSession.State>) { }

  ngOnInit() {

    this.store.pipe(select(fromSession.getSession)).subscribe(
      (data: Session) => {
        if(data.isLoggedIn) {
          this.currentSession = data;
        } else {
          this.currentSession = this.defaultSession;
        }
      }
    );  

    this.cartService.getCartDetails().subscribe(
      (data: Cart[]) => {
        this.cartCount = 0;
        data.forEach(
          (c: Cart) => this.cartCount = c.quantity + this.cartCount
        );
      }
    );
  }

  logout() {
    this.store.dispatch(new fromActions.OnLogout());
    this.router.navigate(['products']);
  }

}