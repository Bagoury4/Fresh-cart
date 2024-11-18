import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guard/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',canActivate:[authGuard] ,component:HomeComponent,title:'home'},
  {path:'products',canActivate:[authGuard] ,component:ProductsComponent,title:'products'},
  {path:'brands',canActivate:[authGuard],component:BrandsComponent,title:'brands'},
  {path:'cart',canActivate:[authGuard],component:CartComponent,title:'cart'},
  {path:'categories',canActivate:[authGuard],component:CategoriesComponent,title:'categories'},
  {path:'register',component:RegisterComponent,title:'register'},
  {path:'login',component:LoginComponent,title:'login'},
  {path:'product-details/:id',canActivate:[authGuard],component:ProductDetailsComponent,title:'product Details'},
  {path:'**',component:NotFoundComponent,title:'notFound'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
