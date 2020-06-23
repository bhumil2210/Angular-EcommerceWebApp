import { AdminAuthGuardService } from './admin-auth-guard.service';
import { AuthGuardService } from './auth-guard.service';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { LoginComponent } from './login/login.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from './admin/product-form/product-form.component';

const routes: Routes = [
  { path:'', component: ProductsComponent },
  { path:'products', component: ProductsComponent },
  { path:'shopping-cart', component: ShoppingCartComponent },
  
  { path:'check-out', component: CheckOutComponent,canActivate:[AuthGuardService] },
  { path:'order-success', component: OrderSuccessComponent,canActivate:[AuthGuardService] },
  { path:'my/orders', component: MyOrdersComponent,canActivate:[AuthGuardService] },
  { path:'login', component: LoginComponent },
  
  { path:'admin/products/new', component: ProductFormComponent,canActivate:[AuthGuardService, AdminAuthGuardService] },
  { path:'admin/products/:id', component: ProductFormComponent,canActivate:[AuthGuardService, AdminAuthGuardService] },
  { path:'admin/products', component: AdminProductsComponent,canActivate:[AuthGuardService, AdminAuthGuardService] },
  { path:'admin/orders', component: AdminOrdersComponent,canActivate:[AuthGuardService,AdminAuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgbModule],
  exports: [RouterModule,NgbModule]
})
export class AppRoutingModule { }
