import { OpenAppOptions } from './../../../../node_modules/open/index.d';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductDetail, SelectOption } from '../../models/product-detail';
import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule,CurrencyPipe],
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

  constructor(readonly route: ActivatedRoute, readonly productService: ProductService ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id') || '';
    console.log( productId);
    if(productId) {
      this.productService.getProduct(productId).subscribe((data) => {
        console.log(data);
        this.product = data;
        this.primaryCamera = data.primaryCamera.map((camera) => camera + ' MP').join(', ');
        this.colorsOptions = data.options.colors;
        this.storageOptions = data.options.storages;
      });
    }
  }

  addToCart() {
    throw new Error('Method not implemented.');
  }
}
