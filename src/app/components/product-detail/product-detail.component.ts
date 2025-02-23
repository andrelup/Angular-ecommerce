import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ProductDetail, SelectOption } from '../../models/product-detail';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule, CurrencyPipe, MatButtonModule, MatIconModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {


  product: ProductDetail | undefined;
  selectedStorage: string = '';
  selectedColor: string = '';
  colorsOptions: SelectOption[] = [];
  storageOptions: SelectOption[] = [];
  primaryCamera: any;

  constructor(readonly route: ActivatedRoute, readonly productService: ProductService, readonly router: Router ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id') || '';
    console.log( productId);
    if(productId) {
      this.productService.getProduct(productId).subscribe((data) => {
        console.log(data);
        this.product = data;
        this.primaryCamera = data.primaryCamera.map((camera) => camera ).join(', ');
        this.colorsOptions = data.options.colors;
        this.storageOptions = data.options.storages;
      });
    }
  }

  addToCart() {
    throw new Error('Method not implemented.');
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
