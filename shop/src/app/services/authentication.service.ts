import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { ShoppingcartService } from './shoppingcart.service';

@Injectable()
export class AuthenticationService {

  private _url = 'https://webshopbackend.herokuapp.com/';
  private _user$: BehaviorSubject<string>;

  constructor(private http: Http, private cartService: ShoppingcartService) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._user$ = new BehaviorSubject<string>(currentUser && currentUser.username);
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  get token(): string {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser) {
      return currentUser.token;
    } else {
      return "";
    }
  }

  login(username: string, password: string): Observable<boolean> {
  return this.http.post(`${this._url}users/login`,{ username: username, password: password })
    .map(res => res.json()).map(res => {
      const token = res.token;
      if (token) {
        localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
        this._user$.next(username);
        return true;
      } else {
        return false;
      }
    });
  }

  isLoggedIn(): Boolean {
    if(this._user$.getValue()) {
      return true;
    }

    return false;
  }

  register(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this._url}users/register`, { username: username, password: password })
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
      localStorage.removeItem('currentUser');
      this.cartService.clearCart();
      setTimeout(() => this._user$.next(null));
    }
  }

  checkUserNameAvailability(username: string): Observable<boolean> {
    return this.http.post(`${this._url}users/checkusername`, { username: username }).map(res => res.json())
      .map(item => {
        if (item.username === 'alreadyexists') {
          return false;
        } else {
          return true;
        }
    });
  }

  checkUserIsAdmin(username: string): Observable<boolean> {
    return this.http.post(this._url + "admin/check", { 'username': username }, { headers: new Headers({Authorization: `Bearer ${this.token}`}) } ).map(res => res.json())
      .map(item => {
        if(item == 'isAdmin') {
          return true;
        } else {
          return false;
        }
    });
  }
}
