import { Component, OnInit } from '@angular/core';

import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-product-overzicht',
  templateUrl: './product-overzicht.component.html',
  styleUrls: ['./product-overzicht.component.css']
})
export class ProductOverzichtComponent implements OnInit {

  products: Product[];
  categories: string[];
  user: string;

  showProducts: Product[];
  searchCategories: string[] = [];
  searchValue: string;
  filterLiked: Boolean = false;

  constructor(private productService: ProductService, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.productService.products.subscribe( items => {
      this.products = items;
      this.showProducts = items;

      this.authService.user$.subscribe(item => {
        this.user = item;
      
        if(this.user) {
          this.productService.getLikes(this.user).subscribe(likes => {
            for(var i = 0; i < this.products.length; i++) {
              if(likes.includes(this.products[i]._id)) {
                this.products[i].liked = true;
              } 
            }
          });
        }
      });
    });

    this.productService.categories.subscribe( items => {
        this.categories = items;
    });
  }

  filter() {
    if(this.searchValue) {
      this.showProducts = this.products.filter(item => item.name.toLowerCase().includes(this.searchValue));
    } else {
      this.showProducts = this.products;
    }

    if(this.filterLiked) {
      this.showProducts = this.showProducts.filter(item => item.liked);
    }

    if(this.searchCategories.length > 0) {
      this.showProducts = this.showProducts.filter(item => this.searchCategories.includes(item.category));
    }
  }

  filterOpValue(filter: string) {
    this.searchValue = filter;
    this.filter();
  }

  filterOpLiked() {
    this.filterLiked = !this.filterLiked;
    this.filter();
  }

  addFilterCategory(filter: string) {
    var index = this.searchCategories.indexOf(filter);
    if(index < 0) {
      this.searchCategories.push(filter);
    } else {
      this.searchCategories.splice(index, 1);
    }
    this.filter();
  }
}
