import { AuthService } from '../../core/services/auth.service';
import { Product } from './../../core/interfaces/product';
import { ProductsService } from './../../core/services/products.service';
import { Component, OnInit } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { CategorySliderComponent } from '../category-slider/category-slider.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, CategorySliderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
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
