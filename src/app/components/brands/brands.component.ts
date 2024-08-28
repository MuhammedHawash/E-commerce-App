import { Brand } from '../../core/interfaces/product';
import { BrandsService } from './../../core/services/brands.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  constructor(private _BrandsService: BrandsService) {}
  allBrands: Brand[] = [];
  getBrands = () => {
    this._BrandsService.getBrands().subscribe({
      next: (res) => {
        this.allBrands=res.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  };
  ngOnInit(): void {
    this.getBrands();
  }
}
