import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { ShoppingcartService } from './shoppingcart.service';

@Injectable()
export class AuthenticationService {

  private _url = 'http://localhost:5000/users';
  private _user$: BehaviorSubject<string>;

  constructor(private http: Http, private cartService: ShoppingcartService) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._user$ = new BehaviorSubject<string>(currentUser && currentUser.username);
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  login(username: string, password: string): Observable<boolean> {
  return this.http.post(`${this._url}/login`,
    { username: username, password: password })
    .map(res => res.json()).map(res => {
      const token = res.token;
      if (token) {
        localStorage.setItem('currentUser',
          JSON.stringify({ username: username, token: token }));
        this._user$.next(username);
        return true;
      } else {
        return false;
      }
    });
  }

  register(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this._url}/register`, { username: username, password: password })
      .map(res => res.json()).map(res => {
        const token = res.token;
        if (token) {
          localStorage.setItem('currentUser',
          JSON.stringify({ username: username, token: res.token }));
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
    });
  }

  logout() {
    if (this.user$.getValue()) {
      this.cartService.clearCart();
      localStorage.removeItem('currentUser');
      setTimeout(() => this._user$.next(null));
    }
  }
}
