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

import { ProductService } from './services/product.service';
import { ShoppingcartService } from './services/shoppingcart.service';
import { AuthenticationService } from './services/authentication.service';

const appRoutes: Routes = [
  { path: 'basket', component: BasketComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'home', component: ProductOverzichtComponent },
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
