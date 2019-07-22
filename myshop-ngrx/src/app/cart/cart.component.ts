import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData: Cart[] = [];
  grandTotal: number = 0;
  paymentComplete: boolean;
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartData = this.cartService.getCartData();
    console.log(this.cartData.forEach(
      (cartItem: Cart) => {
        this.grandTotal += (cartItem.quantity * cartItem.product.price);
      }
    ));
  }

  proceedPayment() {
    this.paymentComplete = true;
    this.cartService.clearCart();
  }
}