import { Component, OnInit } from '@angular/core';

import { ShoppingcartService } from '../services/shoppingcart.service';
import { AuthenticationService } from '../services/authentication.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  shoppingcart: any[] = [];
  fullPrice: number;
  user: string;

  constructor(private cartService: ShoppingcartService, private authService: AuthenticationService, private router: Router) {
    if(!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    }

    let temp = this.cartService.shoppingcart;

    if(temp) {
      for(let i in temp.cartitems) {
        this.shoppingcart.push({
          product: temp.cartitems[i].product,
          amount: temp.cartitems[i].amount
        });
      }
    }

    this.cartService.totalPrice.subscribe(total => {
      this.fullPrice = total;
    });

    this.authService.user$.subscribe(data => { this.user = data });
  }

  ngOnInit() {
  }

  changeCartAmount(amount: number, id: any) {
    this.cartService.setCartAmount(id, amount);
  }

  order() {
    this.cartService.orderProducts(this.shoppingcart, this.fullPrice, this.user).subscribe(item => {
      this.cartService.clearCart();
      this.router.navigate(['/orders']);
    });
  }
}
