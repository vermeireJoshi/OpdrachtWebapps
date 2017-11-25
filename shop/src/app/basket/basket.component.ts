import { Component, OnInit } from '@angular/core';

import { ShoppingcartService } from '../services/shoppingcart.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  shoppingcart: any[] = [];
  fullPrice: number;

  constructor(private shoppingcartService: ShoppingcartService) {
    let temp = this.shoppingcartService.shoppingcart;

    for(let i in temp.cartitems) {
      this.shoppingcart.push({
        product: temp.cartitems[i].product,
        amount: temp.cartitems[i].amount
      });
    }

    this.shoppingcartService.totalPrice.subscribe(total => {
      console.log(total);
      this.fullPrice = total;
    });
  }

  ngOnInit() {
  }


}
