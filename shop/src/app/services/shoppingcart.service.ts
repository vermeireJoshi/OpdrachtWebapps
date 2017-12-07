import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import {Headers} from '@angular/http';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class ShoppingcartService {

  private _url = "https://webshopbackend.herokuapp.com/";

  private _shoppingcart: any;
  private _amount$: Subject<number>;
  private _totalPrice$: Subject<number>;

  constructor(private http: Http) {
    this._shoppingcart = JSON.parse(localStorage.getItem('shoppingcart'));
    this._amount$ = new BehaviorSubject<number>(null);
    this._totalPrice$ = new BehaviorSubject<number>(null);
    this.setSubjects();
  }

  get shoppingcart(): any {
    return this._shoppingcart;
  }

  get amount(): Observable<number> {
    return this._amount$.asObservable();
  }

  get totalPrice(): Observable<number> {
    return this._totalPrice$.asObservable();
  }

  setCartAmount(id: string, amount: number) {
    var index = -1;

    for(var i = 0; i < this._shoppingcart.cartitems.length; i++) {
      if(this._shoppingcart.cartitems[i].product._id == id) {
        index = i;
      }
    }

    if(index >= 0) {
      this._shoppingcart.cartitems[index].amount = amount;
    }

    if(this._shoppingcart.cartitems[index].amount == 0) {
      this._shoppingcart.cartitems.splice(index, 1);
    }

    localStorage.setItem('shoppingcart', JSON.stringify(this._shoppingcart));
    this.setSubjects();
  }

  clearCart() {
    localStorage.removeItem('shoppingcart');
    this._shoppingcart = null;
    this.setSubjects();
  }

  addToCart(product: any, addAmount: number) {
    if(this._shoppingcart) {
      var index = -1;

      for(var i = 0; i < this._shoppingcart.cartitems.length; i++) {
        if(this._shoppingcart.cartitems[i].product._id == product._id) {
          index = i;
        }
      }

      if(index < 0) {
        let newItem = {
          product: product,
          amount: addAmount
        };
        this._shoppingcart.cartitems.push(newItem);
      } else {
        this._shoppingcart.cartitems[index].amount += + +addAmount;
      }
    } else {
      let newItem = {
        product: product,
        amount: +addAmount
      };

      this._shoppingcart = {
        cartitems: [newItem],
      };
    }

    localStorage.setItem('shoppingcart', JSON.stringify(this._shoppingcart));
    this.setSubjects();
  }

  orderProducts(products: any, fullPrice: number, user: any) {
    var request = {
      products: [],
      user: user,
      totalPrice: fullPrice,
    }

    for(var i = 0; i < products.length; i++) {
      request.products.push({product: products[i].product._id, amount: products[i].amount});
    }

    return this.http.post(this._url + "products/order", request, { headers: new Headers({Authorization: `Bearer ${this.token}`}) }).map(response =>
      response.json()
    );
  }

  get token(): string {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.token;
  }

  setSubjects() {
    let amount: number = 0;
    let totalPrice = 0;

    if(this._shoppingcart) {
      for(let i in this._shoppingcart.cartitems) {
        let item = this._shoppingcart.cartitems[i];
        amount += +item.amount;
        totalPrice += item.product.price * item.amount;
      }
    }

    this._amount$.next(amount);
    this._totalPrice$.next(Math.round(totalPrice * 100) / 100);
  }
}
