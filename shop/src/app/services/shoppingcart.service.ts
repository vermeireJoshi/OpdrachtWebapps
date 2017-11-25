import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ShoppingcartService {

  private _shoppingcart: any;
  private _amount$: Subject<number>;
  private _totalPrice$: Subject<number>;

  constructor() {
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

  addToCart(product: any, addAmount: number) {
    if(this._shoppingcart) {
      let exists = false;

      for(let i in this._shoppingcart.cartitems) {
        if(this._shoppingcart.cartitems[i].product._id == product._id) {
          this._shoppingcart.cartitems[i].amount = this._shoppingcart.cartitems[i].amount + addAmount;
          exists = true;
        }
      }

      if(!exists) {
        let newItem = {
          product: product,
          amount: addAmount
        };
        this._shoppingcart.cartitems.push(newItem);
      }
    } else {
      let newItem = {
        product: product,
        amount: addAmount
      };

      this._shoppingcart = {
        cartitems: [newItem],
      };
    }

    localStorage.setItem('shoppingcart', JSON.stringify(this._shoppingcart));
    this.setSubjects();
  }

  removeFromCart(id: string, removeAmount: number) {
    if(this._shoppingcart) {
      for(let i in this._shoppingcart.cartitems) {
        if(this._shoppingcart.cartitems[i].product._id == id) {
          this._shoppingcart.cartitems[i].amount = this._shoppingcart.cartitems[i].amount - removeAmount;

          if(this._shoppingcart.cartitems[i].amount == 0) {
            this._shoppingcart.cartitems.splice(i, 1);
          }
        }
      }

      localStorage.setItem('shoppingcart', JSON.stringify(this._shoppingcart));
      this.setSubjects();
      console.log(this._shoppingcart);
    }
  }

  setSubjects() {
    let amount = 0;
    let totalPrice = 0;

    if(this._shoppingcart) {
      for(let i in this._shoppingcart.cartitems) {
        let item = this._shoppingcart.cartitems[i];
        amount += item.amount;
        totalPrice += item.product.price * item.amount;
      }
    }

    this._amount$.next(amount);
    this._totalPrice$.next(Math.round(totalPrice * 100) / 100);
  }
}
