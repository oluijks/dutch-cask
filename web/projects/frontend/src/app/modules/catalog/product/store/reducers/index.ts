/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromArticlesReducers from './articles.reducer';

export const productsFeatureName = 'catalog_products';

export interface ProductsState {
  articles: fromArticlesReducers.ArticlesState;
}

export const productsReducers: ActionReducerMap<ProductsState> = {
  articles: fromArticlesReducers.articlesReducer,
};

export const getProductsState = createFeatureSelector<ProductsState>(
  productsFeatureName
);

export const selectArticlesState = createSelector(
  getProductsState,
  (state: ProductsState) => state.articles
);

export const selectArticlesEntities = createSelector(
  selectArticlesState,
  fromArticlesReducers.getArticlesEntities
);

export const selectArticlesLoaded = createSelector(
  selectArticlesState,
  fromArticlesReducers.getArticlesLoaded
);

export const selectArticlesLoading = createSelector(
  selectArticlesState,
  fromArticlesReducers.getArticlesLoading
);
