
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, startWith } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { selectProducts } from '../../store/selectors/product.selectors';

import { clearCache, loadProducts } from '../../store/actions/product.actions';



@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule,CurrencyPipe, MatCardModule, MatIconModule, MatPaginatorModule, MatProgressSpinnerModule, NgIf, NgFor],
  providers: [ProductService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  private store = inject(Store);
  products$: Observable<Product[]> = this.store.select(selectProducts).pipe(
    startWith([])
  );
  originalProductList: Product[] = [];
  isLoading = true;
  filterProducts: Product[] = [];

  searchText = '';
  products: Product[]= [];
  currentPage = 1;
  pageSize = 12;

  constructor(readonly productService: ProductService, readonly router: Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());

    this.products$.subscribe(products => {
      this.isLoading = products.length === 0; // Si aún no hay productos, sigue "cargando"
      if(!this.isLoading){
        this.filterProducts = products;
        this.originalProductList = products;
      }
    });
  }

  refreshProducts(): void {
    this.store.dispatch(clearCache());
    this.store.dispatch(loadProducts());
  }
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }
  onSearch() {
    console.log(this.searchText);
    if(this.searchText.length>0){
      this.filterProducts = this.originalProductList.filter((product) => {
        if(product.brand.toLowerCase().includes(this.searchText.toLowerCase()) ||
            product.model.toLowerCase().includes(this.searchText.toLowerCase())){
          return true;
        }
        return false;
      });
    } else {
      this.filterProducts = this.originalProductList;
    }
  }
  detailClick(product: Product) {
    console.log(product);
    this.router.navigate(['/detail/', product.id]);
  }

}
