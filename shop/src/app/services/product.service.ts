import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Product } from '../models/product';
import { Image } from '../models/image';

@Injectable()
export class ProductService {

  private _products = new Array<Product>();
  private _url = "http://localhost:5000";

  constructor(private http: Http) {
  }

  get products(): Observable<Product[]> {
    return this.http.get(this._url + "/products").map(response =>
      response.json().map(item => new Product(item.name, item.category, item.description, item.price, item._id,
        new Image(item.image.filename, item.image.filetype, item.image.value)
      )
    ));
  }

  addProduct() {

  }
}
