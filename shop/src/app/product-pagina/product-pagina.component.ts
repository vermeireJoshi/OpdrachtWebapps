import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../models/product';
import { ShoppingcartService } from '../services/shoppingcart.service';

@Component({
  selector: 'app-product-pagina',
  templateUrl: './product-pagina.component.html',
  styleUrls: ['./product-pagina.component.css']
})
export class ProductPaginaComponent implements OnInit {

  @Input() product: Product;
  @Input() amount: number;

  constructor(private shoppingCartService: ShoppingcartService) {
  }

  ngOnInit() {
  }

  like() {
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.product, 1);
  }
}
