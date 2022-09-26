import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MainActions } from '.';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ApiService } from '../services/api.service';
import { MainState, selectProducts } from './main.store';

@Injectable()
export class MainEffects {

  fetchProducts$ = createEffect(() => this.actions$.pipe(
    ofType(MainActions.FETCH_PRODUCTS),
    mergeMap(() => this.apiService.fetchProducts().pipe(
      map(data => MainActions.FETCH_PRODUCTS_SUCCESS({ data })),
      catchError((err) => of(MainActions.FETCH_PRODUCTS_ERROR({ err })))
    ))
  ));

  fetchProductBySku$ = createEffect(() => this.actions$.pipe(
    ofType(MainActions.FETCH_PRODUCT_BY_SKU),
    withLatestFrom(this.store.select(selectProducts)),
    mergeMap(([action, products]) => {
      if (products && products.length) {
        return of(this.findProductBySku(products, action.sku));
      }
      return this.apiService.fetchProducts().pipe(
        map(data => {
          this.store.dispatch(MainActions.FETCH_PRODUCTS_SUCCESS({ data }));
          return this.findProductBySku(data, action.sku);
        }),
        catchError((err) => of(MainActions.FETCH_PRODUCTS_ERROR({ err })))
      );
    })
  ));

  constructor(private actions$: Actions, private apiService: ApiService, private store: Store<MainState>) { }

  private findProductBySku(products, sku) {
    const foundProduct = products.find(item => item.sku === Number(sku));
    return MainActions.SET_CURRENT_PRODUCT({ product: foundProduct || null });
  }

}
