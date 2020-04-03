/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LoggerService} from '../../../../../services/logger.service';
import {ArticleResolver} from '../../store/article.resolver';

@Component({
  selector: 'dcwa-products',
  template: `
  <div *ngIf="!(articleResolver.articleCache | async)"><p>No articles</p></div>
  <ng-container *ngIf="(articleResolver.isLoaded | async)">
    <dcwa-product-list [products]="(articleResolver.articleCache | async)"></dcwa-product-list>
  </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  /**
   * Default constructor.
   * @param  {ArticleResolver} publicarticleResolver
   */
  constructor(
    private logger: LoggerService,
    public articleResolver: ArticleResolver
  ) {
    this.log('constructor()');
  }

  /**
   * Initialize component.
   * @returns void
   */
  ngOnInit(): void {
    this.log('ngOnInit()');
    this.articleResolver.loadingSpinner();
  }

  /**
   * @param  {string} message
   */
  private log(message: string): void {
    const timestamp = new Date().toISOString();
    this.logger.log(
      `[${timestamp}] - ProductsComponent:: ${message}`,
      'background: #222; color: yellow'
    );
  }
}
