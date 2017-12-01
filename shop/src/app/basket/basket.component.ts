import { Component, OnInit } from '@angular/core';

import { ShoppingcartService } from '../services/shoppingcart.service';
import { AuthenticationService } from '../services/authentication.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  shoppingcart: any[] = [];
  fullPrice: number;
  user: string;

  constructor(private shoppingcartService: ShoppingcartService, private authService: AuthenticationService, private productService: ProductService) {
    let temp = this.shoppingcartService.shoppingcart;

    if(temp) {
      for(let i in temp.cartitems) {
        this.shoppingcart.push({
          product: temp.cartitems[i].product,
          amount: temp.cartitems[i].amount
        });
      }
    }

    this.shoppingcartService.totalPrice.subscribe(total => {
      this.fullPrice = total;
    });

    this.authService.user$.subscribe(data => { this.user = data });
  }

  ngOnInit() {
  }

  changeCartAmount(amount: number, id: any) {
    this.shoppingcartService.setCartAmount(id, amount);
  }

  order() {
    this.productService.orderProducts(this.shoppingcart, this.user).subscribe(item => {
      console.log(item);
    });
  }
}
