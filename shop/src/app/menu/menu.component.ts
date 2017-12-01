import { Component, OnInit } from '@angular/core';
import { ShoppingcartService } from '../services/shoppingcart.service';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  amount: number;
  user: string;

  constructor(private shoppingcartService: ShoppingcartService, private authService: AuthenticationService) {
    this.shoppingcartService.amount.subscribe(data => { this.amount = data; });
    this.authService.user$.subscribe(data => { this.user = data });
  }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
  }
}
