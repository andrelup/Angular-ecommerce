
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { selectProducts } from '../../store/selectors/product.selectors';

import { clearCache, loadProducts } from '../../store/actions/product.actions';



@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule,CurrencyPipe, MatCardModule, MatIconModule],
  providers: [ProductService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  private store = inject(Store);
  products$: Observable<Product[]> = this.store.select(selectProducts);

  searchText: string = '';
  products: Product[]= [];

  constructor(readonly productService: ProductService, readonly router: Router) {
  }
  // ngOnInit(): void {
  //   this.productService.getProducts().subscribe((data) => {
  //     console.log(data);
  //     this.products = data;
  //   });
  // }


  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  refreshProducts(): void {
    this.store.dispatch(clearCache());
    this.store.dispatch(loadProducts());
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
