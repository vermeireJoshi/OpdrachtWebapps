import { Component, OnInit } from '@angular/core';

import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-overzicht',
  templateUrl: './product-overzicht.component.html',
  styleUrls: ['./product-overzicht.component.css']
})
export class ProductOverzichtComponent implements OnInit {

  private products: Product[];
  showProducts: Product[];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.products.subscribe( items => {
      this.products = items;
      this.showProducts = items;
    });
  }

  filter(filter: string) {
    this.showProducts = this.products.filter(item => item.name.toLowerCase().includes(filter)
      || item.category.toLowerCase().includes(filter));
  }
}
