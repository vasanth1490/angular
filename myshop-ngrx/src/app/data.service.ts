import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';
import { Product } from './models/product';
import { Observable } from 'rxjs';

const BASE_URL: string = "https://my-json-server.typicode.com/vasanth1490/static/";
const USERS_URL: string = BASE_URL + "users";
const PRODUCTS_URL: string = BASE_URL + "products";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(USERS_URL, {
      params: {
        username: username,
        password: password
      }
    });
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(USERS_URL, user);
  }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCTS_URL);
  }

  public getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(PRODUCTS_URL + '/' + productId);
  }

}