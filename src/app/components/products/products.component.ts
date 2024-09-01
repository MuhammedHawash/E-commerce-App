import { Component } from '@angular/core';

import { ProductsService } from '../../core/services/products.service';
import { AuthService } from '../../core/services/auth.service';
import { Product } from '../../core/interfaces/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  allProducts: Product[] = [];
  constructor(
    private _ProductsService: ProductsService,
    private token: AuthService
  ) {
    this.token.saveUserData();
  }
  getProducts = () => {
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  ngOnInit(): void {
    this.getProducts();
  }
}
