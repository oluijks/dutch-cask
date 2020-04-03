/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {takeUntil} from 'rxjs/internal/operators/takeUntil';
import {UnsubscribeOnDestroy} from '../../../../classes/unsubscribe-on-destroy';
import {LoadingSpinnerService} from '../../../../services/loading-spinner.service';
import {Article} from '../models/article.model';
import {
  LoadArticlesFromCache,
  ProductsState,
  selectArticlesEntities,
  selectArticlesLoaded,
  selectArticlesLoading,
} from '../store';

@Injectable()
export class ArticleResolver extends UnsubscribeOnDestroy
  implements Resolve<Observable<Article[]>> {
  /**
   * @type {Observable<Article[]>}
   */
  private articleCache$: Observable<Article[]>;

  /**
   * @type {Observable<boolean>}
   */
  private isLoaded$: Observable<boolean>;

  /**
   * @type {Observable<boolean>}
   */
  private isLoading$: Observable<boolean>;

  private isLoadedSubscription: Subscription;

  /**
   * Default constructor.
   * @param  {Store<ProductsState>} privatestore
   */
  constructor(
    private store: Store<ProductsState>,
    private loadingSpinnerService: LoadingSpinnerService
  ) {
    super();
  }

  /**
   * @returns Observable<Article[]>
   */
  get articleCache(): Observable<Article[]> {
    return this.articleCache$;
  }

  /**
   * @returns Observable<boolean>
   */
  get isLoaded(): Observable<boolean> {
    return this.isLoaded$;
  }

  /**
   * @returns Observable<boolean>
   */
  get isLoading(): Observable<boolean> {
    return this.isLoading$;
  }

  /**
   * @returns void
   */
  loadingSpinner(): void {
    this.loadingSpinnerService.reveal();
    // this.isLoaded.subscribe((loaded: boolean) => {
    //   if (loaded) {
    //     this.loadingSpinnerService.conceal();
    //   }
    // });
    this.isLoaded.pipe(takeUntil(this.d$)).subscribe((loaded: boolean) => {
      if (loaded) {
        this.loadingSpinnerService.conceal();
      }
    });
  }

  /**
   * @returns Promise<Observable<Article[]>>
   */
  async resolve(): Promise<Observable<Article[]>> {
    if (!this.articleCache) {
      await this.buildCacheFromProductStore();
      this.store.dispatch(new LoadArticlesFromCache());
    }
    return this.articleCache;
  }

  /**
   * @returns Promise<void>
   */
  private async buildCacheFromProductStore(): Promise<void> {
    this.articleCache$ = this.store.pipe(select(selectArticlesEntities));
    this.isLoaded$ = this.store.pipe(select(selectArticlesLoaded));
    this.isLoading$ = this.store.pipe(select(selectArticlesLoading));
  }
}
