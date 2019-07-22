import { Injectable } from '@angular/core';
import { Cart } from './models/cart';
import { Product } from './models/product';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartData: Cart[] = [];
  private cartSubject: Subject<Cart[]> = new Subject<Cart[]>();

  constructor() { }

  getCartDetails(): Observable<Cart[]> {
    return this.cartSubject.asObservable();
  }

  getCartData(): Cart[] {
    return this.cartData;
  }

  updateCart(product: Product, quantity: number) {
    let index: number = this.cartData.findIndex((cart: Cart) => {
      return cart.product.id == product.id;
    });
    if (index > -1) {
      let currentQnt: number = this.cartData[index].quantity as number;
      this.cartData[index].quantity = parseInt(currentQnt + "") + parseInt(quantity + "");
    } else {
      console.log(isNaN(quantity));
      let tmpCart: Cart = {
        quantity: parseInt(quantity + ""),
        product: product
      };
      this.cartData.push(tmpCart);
    }
    this.cartSubject.next(this.cartData);
  }

  clearCart(): void {
    this.cartData = [];
    this.cartSubject.next(this.cartData);
  }


}