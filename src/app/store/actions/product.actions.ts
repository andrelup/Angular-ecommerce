import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product';


export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: any }>()
);
export const clearCache = createAction('[Product] Clear Cache');
