import { createAction, props } from '@ngrx/store';
import { Product } from './main.store';

const MAIN_KEY = '[Main]';

export const FETCH_PRODUCTS = createAction(
  `${MAIN_KEY} fetch products`
);

export const FETCH_PRODUCTS_SUCCESS = createAction(
  `${MAIN_KEY} fetch products success`,
  props<{ data: Product[] }>()
);

export const FETCH_PRODUCTS_ERROR = createAction(
  `${MAIN_KEY} fetch products error`,
  props<{ err: any }>()
);

export const FETCH_PRODUCT_BY_SKU = createAction(
  `${MAIN_KEY} fetch product by sku`,
  props<{ sku: number }>()
);

export const SET_CURRENT_PRODUCT = createAction(
  `${MAIN_KEY} clear current product`,
  props<{ product: Product }>()
);
