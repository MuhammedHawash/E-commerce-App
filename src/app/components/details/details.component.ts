import { category } from './../../core/interfaces/category';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ButtonComponent, NgClass],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  product = {} as Product;
  category = {} as category;
  ngOnInit(): void {
    let id: string = '';

    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        id = params.get('id')!;
        console.log(params.get('id'));
      },
      error: () => {
        console.log('error');
      },
    });

    // console.log(this._ActivatedRoute.snapshot.params['id']);

    this._ProductsService.getProduct(id).subscribe({
      next: (response) => {
        this.product = response.data;
        console.log(this.product);
      },
    });
  }
}
