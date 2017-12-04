import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SuiModule } from 'ng2-semantic-ui';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductPaginaComponent } from './product-pagina/product-pagina.component';
import { ProductOverzichtComponent } from './product-overzicht/product-overzicht.component';
import { MenuComponent } from './menu/menu.component';
import { BasketComponent } from './basket/basket.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrdersComponent } from './orders/orders.component';

import { ProductService } from './services/product.service';
import { ShoppingcartService } from './services/shoppingcart.service';
import { AuthenticationService } from './services/authentication.service';

const appRoutes: Routes = [
  { path: 'home', component: ProductOverzichtComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: ProductOverzichtComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductPaginaComponent,
    ProductOverzichtComponent,
    MenuComponent,
    BasketComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    SuiModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule, ReactiveFormsModule,
  ],
  providers: [
    ProductService,
    ShoppingcartService,
    AuthenticationService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
