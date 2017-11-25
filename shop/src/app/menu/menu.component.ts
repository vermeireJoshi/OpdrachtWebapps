import { Component, OnInit } from '@angular/core';

import { ShoppingcartService } from '../services/shoppingcart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  amount: number;

  constructor(private shoppingcartService: ShoppingcartService) {
    this.shoppingcartService.amount.subscribe(data => { this.amount = data; });
  }

  ngOnInit() {

  }
}
