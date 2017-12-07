import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http';

import { Product } from '../models/product';
import { Image } from '../models/Image';
import { Order, OrderProduct } from '../models/Order';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ProductService {

  private _products = new Array<Product>();
  private _url = "https://webshopbackend.herokuapp.com/";

  constructor(private http: Http, private auth: AuthenticationService) {
  }

  get products(): Observable<Product[]> {
    return this.http.get(this._url + "products").map(response => 
      response.json().map(item => new Product(item.name, item.category, item.description, item.price, item._id,
        item.image? new Image(item.image.filename, item.image.filetype, item.image.value) : undefined
      )
    ));
  }

  get categories(): Observable<string[]> {
    return this.http.get(this._url + "categories").map(response =>
      response.json()
    );
  }

  getLikes(username: string): Observable<string[]> {
    return this.http.get(this._url + "likes/" + username, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) }).map(response => response.json());
  }

  addLike(username: string, productId: string): Observable<string> {
    return this.http.post(this._url + "likes/add/" + username, {'productId': productId}, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) }).map(response => response.json());
  }

  getOrders(username: string): Observable<Order[]> {
    return this.http.get(this._url + "orders/" + username, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) }).map(response => 
      response.json()
    );
  }

  addProduct(username: string, product: any): Observable<string> {
    return this.http.post(this._url + "admin/add/product", {product: product, username: username}, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`}) })
      .map(response => response.json()
    );
  }
}
