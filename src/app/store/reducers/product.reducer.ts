import { createReducer, on } from '@ngrx/store';
import { loadProductsSuccess, clearCache } from '../actions/product.actions';
import { Product } from '../../models/product.model';

export interface ProductState {
  products: Product[];
  lastUpdated: number | null; // Timestamp de la última actualización
}

const initialState: ProductState = {
  products: [],
  lastUpdated: null,
};

export const productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    lastUpdated: Date.now(), // Guardamos el timestamp de la última actualización
  })),
  on(clearCache, () => ({
    ...initialState // Borra la caché
  }))
);
