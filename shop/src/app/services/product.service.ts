import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Product } from '../models/product';
import { Image } from '../models/image';

@Injectable()
export class ProductService {

  private _products = new Array<Product>();
  private _url = "http://localhost:5000/";

  constructor(private http: Http) {
  }

  get products(): Observable<Product[]> {
    return this.http.get(this._url + "products").map(response =>
      response.json().map(item => new Product(item.name, item.category, item.description, item.price, item._id,
        new Image(item.image.filename, item.image.filetype, item.image.value)
      )
    ));
  }

  get categories(): Observable<string[]> {
    return this.http.get(this._url + "categories").map(response =>
      response.json()
    );
  }

  orderProducts(products: any, user: any) {
    console.log(products);
    var request = {
      products: [],
      user: user
    }

    for(var i = 0; i < products.length; i++) {
      request.products.push({product: products[i].product._id, amount: products[i].amount});
    }

    return this.http.post(this._url + "products/order", request).map(response =>
      response.json()
    );
  }

  getLikes(username: string): Observable<string[]> {
    return this.http.get(this._url + "likes/" + username).map(response => response.json());
  }

  addLike(username: string, productId: string): Observable<string> {
    return this.http.post(this._url + "likes/add/" + username, {'productId': productId}).map(response => response.json());
  }
}
