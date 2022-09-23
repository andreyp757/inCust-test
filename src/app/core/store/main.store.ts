import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { MainActions } from './index';

export interface MainState {
  productsList: any[];
  currentProduct: any;
}

const initialState: MainState = {
  productsList: [],
  currentProduct: null
};

export const mainReducer = createReducer<MainState>(
  initialState,
  on(MainActions.FETCH_PRODUCTS_SUCCESS, (state, action) => ({ ...state, productsList: action.data })),
  on(MainActions.SET_CURRENT_PRODUCT, (state, action) => ({ ...state, currentProduct: action.product }))
);

export const mainStoreKey = 'main';
export const selectMainState = createFeatureSelector<MainState>(mainStoreKey);

export const selectProducts = createSelector(
  selectMainState,
  (state) => state.productsList
);

export const selectCurrentProduct = createSelector(
  selectMainState,
  (state) => state.currentProduct
);
