import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  currentProductId: number;
  currentProduct: Product;
  isNoProduct: boolean;
  showLoading: boolean = true;
  prodQuantity: number;
  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private cartService: CartService) { }

  ngOnInit() {
    this.currentProductId = this.activatedRoute.params['value']['id'];
    this.dataService.getProductById(this.currentProductId).subscribe(
      (data: Product) => {
        this.currentProduct = data;
        if(Object.keys(data).length == 0) {
          this.isNoProduct = true;
        } else {
          this.isNoProduct = false;
        }
        this.showLoading = false;
      }
    );
  }
  
  addToCart() {
    if(this.prodQuantity > 0) {
      this.cartService.updateCart(this.currentProduct, this.prodQuantity);
    }
  }
}