import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SuiModule } from 'ng2-semantic-ui';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductPaginaComponent } from './product-pagina/product-pagina.component';
import { ProductOverzichtComponent } from './product-overzicht/product-overzicht.component';
import { ProductService } from './services/product.service';
import { ShoppingcartService } from './services/shoppingcart.service';
import { MenuComponent } from './menu/menu.component';
import { BasketComponent } from './basket/basket.component';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
  { path: 'basket', component: BasketComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'home', component: ProductOverzichtComponent },
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
  ],
  imports: [
    BrowserModule,
    SuiModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    ProductService,
    ShoppingcartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
