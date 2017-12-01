import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router/';

import { Product } from '../models/product';
import { ShoppingcartService } from '../services/shoppingcart.service';
import { ProductService } from '../services/product.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-product-pagina',
  templateUrl: './product-pagina.component.html',
  styleUrls: ['./product-pagina.component.css']
})
export class ProductPaginaComponent implements OnInit {

  @Input() product: Product;
  @Input() user: string;

  constructor(private shoppingCartService: ShoppingcartService, private productService: ProductService, private router: Router) {
  }

  ngOnInit() {
  }

  like() {
    if(this.user) {
      this.product.liked = !this.product.liked;
      this.productService.addLike(this.user, this.product._id).subscribe(item => item);
    } else {

    }
  }

  addToCart() {
    if(this.user) {
      this.shoppingCartService.addToCart(this.product, 1);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
