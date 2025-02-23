import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductState } from '../reducers/product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectProducts = createSelector(
  selectProductState,
  (state) => state.products
);

export const selectLastUpdated = createSelector(
  selectProductState,
  (state) => state.lastUpdated
);
