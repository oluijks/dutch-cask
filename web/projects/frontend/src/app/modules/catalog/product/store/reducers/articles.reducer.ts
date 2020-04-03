/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import * as fromArticlesModel from '../../models';
import * as fromArticleActions from '../actions';

export interface ArticlesState {
  entities: fromArticlesModel.Article[];
  loaded: boolean;
  loading: boolean;
}

export const initialArticleState: ArticlesState = {
  entities: [],
  loaded: false,
  loading: false,
};

export function articlesReducer(
  state = initialArticleState,
  action: fromArticleActions.ArticlesActions
): ArticlesState {
  switch (action.type) {
    case fromArticleActions.LOAD_ARTICLES:
    case fromArticleActions.LOAD_ARTICLES_FROM_CACHE: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromArticleActions.LOAD_ARTICLES_FAILURE: {
      return {
        ...state,
        loaded: false,
        loading: false,
      };
    }
    case fromArticleActions.LOAD_ARTICLES_SUCCESS:
    case fromArticleActions.LOAD_ARTICLES_SUCCESS_FROM_CACHE: {
      return {
        ...state,
        loaded: true,
        loading: false,
        entities: action.payload,
      };
    }
  }
  return state;
}

export const getArticlesLoaded = (state: ArticlesState) => state.loaded;
export const getArticlesLoading = (state: ArticlesState) => state.loading;
export const getArticlesEntities = (state: ArticlesState) => state.entities;
