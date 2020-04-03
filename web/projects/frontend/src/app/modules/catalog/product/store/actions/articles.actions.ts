/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {Action} from '@ngrx/store';
import * as fromArticlesModel from '../../models';

export const LOAD_ARTICLES = '[Product API] Load Articles';
export const LOAD_ARTICLES_FAILURE = '[Product API] Load Articles Failure';
export const LOAD_ARTICLES_SUCCESS = '[Product API] Load Articles Success';

export const LOAD_ARTICLES_FROM_CACHE =
  '[Product API] Load Articles From Cache';
export const LOAD_ARTICLES_SUCCESS_FROM_CACHE =
  '[Product API] Load Articles From Cache Success';

export class LoadArticles implements Action {
  readonly type = LOAD_ARTICLES;
}

export class LoadArticlesFailure implements Action {
  readonly type = LOAD_ARTICLES_FAILURE;
  constructor(public payload: any) {}
}

export class LoadArticlesSuccess implements Action {
  readonly type = LOAD_ARTICLES_SUCCESS;
  constructor(public payload: fromArticlesModel.Article[]) {}
}

export class LoadArticlesFromCache implements Action {
  readonly type = LOAD_ARTICLES_FROM_CACHE;
}

export class LoadArticlesSuccessFromCache implements Action {
  readonly type = LOAD_ARTICLES_SUCCESS_FROM_CACHE;
  constructor(public payload: fromArticlesModel.Article[]) {}
}

export type ArticlesActions =
  | LoadArticles
  | LoadArticlesFailure
  | LoadArticlesSuccess
  | LoadArticlesFromCache
  | LoadArticlesSuccessFromCache;
