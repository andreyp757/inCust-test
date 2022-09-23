import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FETCH_PRODUCTS, FETCH_PRODUCT_BY_SKU, SET_CURRENT_PRODUCT } from './main.actions';
import { selectCurrentProduct, selectProducts } from './main.store';

@Injectable({ providedIn: 'root' })
export class MainProxy {

  productsList$ = this.store.select(selectProducts);
  currentProduct$ = this.store.select(selectCurrentProduct);

  constructor(private store: Store<any>) {
  }

  fetchProducts() {
    this.store.dispatch(FETCH_PRODUCTS());
  }

  fetchProductBySku(sku) {
    this.store.dispatch(FETCH_PRODUCT_BY_SKU({ sku }));
  }

  clearCurrentProduct() {
    this.store.dispatch(SET_CURRENT_PRODUCT({ product: null }));
  }

}
