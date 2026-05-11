import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { ProductListComponent } from './components/product-list/product-list';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
