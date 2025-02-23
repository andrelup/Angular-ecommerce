import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../services/product.service';
import { loadProducts, loadProductsSuccess } from '../actions/product.actions';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducer';
import { selectLastUpdated } from '../selectors/product.selectors';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions); // ✅ Inyección sin constructor
  private productService = inject(ProductService); // ✅ Asegurar la inyección del servicio
  private store = inject(Store<ProductState>);

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

        // ⚠️ VERIFICACIÓN: ¿Está devolviendo un Observable?
        if (!this.productService || !this.productService.getProducts) {
          console.error('ProductService no está disponible o getProducts() es undefined');
          return of(loadProductsSuccess({ products: [] })); // Evitar el error
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

  constructor() {
    console.log('ProductEffects inicializado'); // Verificar si el efecto se está creando
  }
}
