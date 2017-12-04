import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { ProductService } from '../services/product.service';
import { Order, OrderProduct } from '../models/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders = [];

  constructor(private authService: AuthenticationService, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.authService.user$.subscribe(item => {
      if(!item) {
        this.router.navigate(['login']);
      }

      this.productService.getOrders(item).subscribe(orders => {
        orders.forEach(e => {
          var products = [];
          e.products.forEach(p => {
            var newProduct = new OrderProduct(p.product, p.amount);
            products.push(newProduct);
          });
          var newOrder = new Order(e._id, products, e.date, e.totalPrice);
          this.orders.push(newOrder);
        });
      });
    });
  }

}
