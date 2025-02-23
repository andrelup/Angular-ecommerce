
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';



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

  constructor(readonly productService: ProductService, readonly router: Router) {
  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }
  onSearch() {
    console.log(this.searchText);
  }
  detailClick(product: Product) {
    console.log(product);
    this.router.navigate(['/detail/', product.id]);
  }
  addToCart(product: Product) {
    console.log(product);
    this.productService.addToCart(product).subscribe((data) => {
      console.log(data);
    });
  }
}
