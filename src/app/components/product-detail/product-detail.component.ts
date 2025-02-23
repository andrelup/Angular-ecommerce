import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ProductDetail, SelectOption } from '../../models/product-detail';
import { ProductService } from './../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule, CurrencyPipe, MatButtonModule, MatIconModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  private cartService = inject(CartService);
  readonly productService = inject(ProductService);

  product: ProductDetail | undefined;
  selectedStorage: string = '';
  selectedColor: string = '';
  colorsOptions: SelectOption[] = [];
  storageOptions: SelectOption[] = [];
  primaryCamera: any;

  constructor(readonly route: ActivatedRoute, readonly router: Router ) {}

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
        if(this.colorsOptions.length === 1) {
          this.selectedColor = this.colorsOptions[0].code;
        }
        if(this.storageOptions.length === 1) {
          this.selectedStorage = this.storageOptions[0].code;
        }
      });
    }
  }

  addToCart() {
    if(this.selectedColor && this.selectedStorage && this.product && this.product.id) {
      const product = {
        id: this.product.id,
        colorCode: this.selectedColor,
        storageCode: this.selectedStorage
      };
      this.productService.addToCart(product).subscribe((data) => {
        console.log(data);
        this.cartService.updateCartCount(data.count);
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
