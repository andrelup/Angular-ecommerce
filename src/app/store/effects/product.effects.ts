import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../services/product.service';
import { loadProducts, loadProductsSuccess, clearCache } from '../actions/product.actions';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducer';
import { selectLastUpdated } from '../selectors/product.selectors';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store<ProductState>
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      withLatestFrom(this.store.select(selectLastUpdated)),
      mergeMap(([_, lastUpdated]) => {
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;

        // Si los datos están en caché y no han pasado 1 hora, los usamos
        if (lastUpdated && now - lastUpdated < oneHour) {
          const cachedProducts = JSON.parse(localStorage.getItem('cachedProducts') || '[]');
          return of(loadProductsSuccess({ products: cachedProducts }));
        }

        // Si no hay caché válida, hacer petición a la API
        return this.productService.getProducts().pipe(
          map((products) => {
            localStorage.setItem('cachedProducts', JSON.stringify(products));
            return loadProductsSuccess({ products });
          })
        );
      })
    )
  );

  clearCache$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clearCache),
      map(() => {
        localStorage.removeItem('cachedProducts');
        return { type: '[Product] Cache Cleared' };
      })
    )
  );
}
