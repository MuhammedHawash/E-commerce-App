import { category } from '../../core/interfaces/category';
import { AuthService } from '../../core/services/auth.service';
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
  constructor(
    private _CategoriesService: CategoriesService,
    private token: AuthService
  ) {
    this.token.saveUserData();
  }
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
