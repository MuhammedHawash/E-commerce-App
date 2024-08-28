import { category } from '../../core/interfaces/category';
import { CategoriesService } from './../../core/services/categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  constructor(private _CategoriesService: CategoriesService) {}
  allCategories: category[] = [];
  getCategories = () => {
    this._CategoriesService.getCategories().subscribe({
      next: (res) => (this.allCategories = res.data),
      error: (err) => console.error(err),
    });
  };
  ngOnInit(): void {
    this.getCategories();
  }
}
