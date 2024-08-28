import { ProductsComponent } from './components/products/products.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    // canActivate: [isLoggedInGuard],
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', component: SigninComponent, title: 'SignIn' },
      { path: 'signup', component: SignupComponent, title: 'SignUp' },
    ],
  },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],

    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
      },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
      { path: 'products', component: ProductsComponent, title: 'Products' },
      { path: 'cart', component: CartComponent, title: 'Cart' },
      { path: 'order', component: OrdersComponent, title: 'Order' },
      { path: 'wishlist', component: WishlistComponent, title: 'Wishlist' },
    ],
  },
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
