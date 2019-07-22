import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Product } from '../models/product';
import { ProductCategory } from '../models/product-category';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  showLoading: boolean = true;
  products: Product[] = [];
  productsByCategories: ProductCategory[] = [];
  filteredProductsByCategories: ProductCategory[] = [];
  currentCategoryId: number = -1;

  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let catQueryParam: number = this.activatedRoute.queryParams['value']['category'];
    this.currentCategoryId = catQueryParam? catQueryParam : this.currentCategoryId;
    this.dataService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
        this.extractAllProductsByCategories();
        this.showLoading = false;
        this.filterProducts(this.currentCategoryId);
      }
    );
  }

  filterProducts(catId: number) {
    this.router.navigate([],{
      relativeTo: this.activatedRoute,
      queryParams: { category: catId },
      queryParamsHandling: "merge"
    });
    if(catId == -1) {
      this.filteredProductsByCategories = this.productsByCategories;
    } else {
      this.filteredProductsByCategories = this.productsByCategories.filter((cat) => {
        return cat.id == catId;
      });
    }
  }

  goToProduct(productId: number): void {
    this.router.navigate(['product', productId]);
  }

  extractAllProductsByCategories(): void {
    this.productsByCategories = [];
    this.products.forEach(
      (product: Product) => {
        let catIndex = this.getIndexOfCategory(product.categoryid);
        if (catIndex > -1) {
          this.productsByCategories[0].products.push(product);
        } else {
          this.productsByCategories.push({
            id: product.categoryid,
            name: product.category,
            products: [product]
          });
        }
      }
    );
  }

  getIndexOfCategory(id: number): number {
    let index: number = -1;
    this.productsByCategories.forEach(
      (pc: ProductCategory, i) => {
        if (pc.id === id) {
          index = i;
        }
      }
    );
    return index;
  }

}