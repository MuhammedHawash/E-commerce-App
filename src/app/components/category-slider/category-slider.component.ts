import { category } from './../../core/interfaces/category';
import { Component, inject } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss',
})
export class CategorySliderComponent {
  categories: category[] = [];
  private readonly _CategoriesService = inject(CategoriesService);
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 3000,
    slideTransition: 'linear',
    smartSpeed: 1000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 5,
      },
    },
    nav: false,
  };

  getCategories = () => {
    this._CategoriesService.getCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.categories = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  ngOnInit() {
    this.getCategories();
  }
}
