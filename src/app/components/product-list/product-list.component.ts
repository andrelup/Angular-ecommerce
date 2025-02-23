import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule, MatGridListModule, MatCardModule, MatIconModule, CurrencyPipe],
  providers: [ProductService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  searchText: string = '';
  products: Product[]= [];
  // products: Product[] = [
  //   {
  //     id: '1',
  //     brand: 'Apple',
  //     imgUrl: 'https://example.com/iphone-15.jpg',
  //     model: 'iPhone 15',
  //     price: 999
  //   },
  //   {
  //     id: '2',
  //     brand: 'Samsung',
  //     imgUrl: 'https://example.com/galaxy-s23.jpg',
  //     model: 'Galaxy S23',
  //     price: 899
  //   },
  //   {
  //     id: '3',
  //     brand: 'Google',
  //     imgUrl: 'https://example.com/pixel-8.jpg',
  //     model: 'Pixel 8',
  //     price: 799
  //   },
  //   {
  //     id: '4',
  //     brand: 'OnePlus',
  //     imgUrl: 'https://example.com/oneplus-11.jpg',
  //     model: 'OnePlus 11',
  //     price: 749
  //   },
  //   {
  //     id: '5',
  //     brand: 'Xiaomi',
  //     imgUrl: 'https://example.com/xiaomi-13.jpg',
  //     model: 'Xiaomi 13',
  //     price: 699
  //   },
  //   {
  //     id: '6',
  //     brand: 'Sony',
  //     imgUrl: 'https://example.com/xperia-1.jpg',
  //     model: 'Xperia 1 V',
  //     price: 999
  //   },
  //   {
  //     id: '7',
  //     brand: 'Motorola',
  //     imgUrl: 'https://example.com/moto-edge.jpg',
  //     model: 'Moto Edge 40',
  //     price: 599
  //   },
  //   {
  //     id: '8',
  //     brand: 'Asus',
  //     imgUrl: 'https://example.com/rog-phone.jpg',
  //     model: 'ROG Phone 7',
  //     price: 1099
  //   },
  //   {
  //     id: '9',
  //     brand: 'Realme',
  //     imgUrl: 'https://example.com/realme-gt.jpg',
  //     model: 'Realme GT 3',
  //     price: 599
  //   },
  //   {
  //     id: '10',
  //     brand: 'Oppo',
  //     imgUrl: 'https://example.com/oppo-find.jpg',
  //     model: 'Oppo Find X6',
  //     price: 899
  //   }
  // ];
  constructor(readonly productService: ProductService) {
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }
  onSearch(event: any) {
    this.searchText = event.target.value;
    console.log(this.searchText);
  }
}
