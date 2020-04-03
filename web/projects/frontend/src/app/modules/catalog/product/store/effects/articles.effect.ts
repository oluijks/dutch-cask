/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiService} from '@dc/api';
import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs/internal/observable/of';
import {catchError} from 'rxjs/internal/operators/catchError';
import {exhaustMap} from 'rxjs/internal/operators/exhaustMap';
import {map} from 'rxjs/internal/operators/map';
import {environment} from '../../../../../../environments/environment';
import * as fromArticlesModel from '../../models';
import * as fromArticleActions from '../actions';

@Injectable()
export class ArticlesEffects {
  private readonly apiUrl: string = `${environment.api.baseUrl}${
    environment.api.resources.products
  }`;

  /**
   * Default constructor.
   * @param  {Actions} privateactions$
   * @param  {ApiService} privateapiService
   */
  constructor(private actions$: Actions, private apiService: ApiService) {
    this.apiService.endPoint = this.apiUrl;
  }

  @Effect()
  loadArticles$ = this.actions$
    .ofType(fromArticleActions.LOAD_ARTICLES_FROM_CACHE)
    .pipe(
      exhaustMap(_ => {
        return this.apiService.articles.pipe(
          map(
            (articles: fromArticlesModel.Article[]) =>
              new fromArticleActions.LoadArticlesSuccessFromCache(articles)
          ),
          this.handleError()
        );
      })
    );

  private handleError() {
    return catchError((error: HttpErrorResponse) =>
      of(new fromArticleActions.LoadArticlesFailure(error))
    );
  }
}
