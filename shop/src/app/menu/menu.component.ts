import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingcartService } from '../services/shoppingcart.service';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  amount: number;
  user: string;
  isAdmin: boolean;

  @ViewChild('basket') basket: ElementRef;
  basketMessage: string;

  constructor(private shoppingcartService: ShoppingcartService, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authService.user$.subscribe(data => {
      this.user = data;
      if (this.user) {
        this.authService.checkUserIsAdmin(this.user).subscribe(item => {
          this.isAdmin = item;
        });
      }

      this.shoppingcartService.amount.subscribe(data => {
        this.amount = data;

        this.basketMessage;
        if (!this.user) {
          this.basketMessage = "Login to order items"
        } else if (this.amount > 0) {
          this.basketMessage = "Go to basket";
        } else {
          this.basketMessage = "No items in basket";
        }
        this.basket.nativeElement.setAttribute('data-tooltip', this.basketMessage);   
      });
    });
}

logout() {
  this.authService.logout();
  this.router.navigate(['login']);
}
}
