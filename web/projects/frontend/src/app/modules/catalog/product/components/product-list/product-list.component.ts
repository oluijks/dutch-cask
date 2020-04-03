/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {LoggerService} from '../../../../../services/logger.service';
import {Article, ArticleData} from '../../models/article.model';

const MEDIUM_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'dcwa-product-list',
  template: `
  <div fxLayout="row wrap" fxLayoutAlign="space-around" fxLayoutAlign.md="space-between">
    <ng-container *ngFor="let product of products">
      <div *ngFor="let p of product.products" fxFlex="100" fxFlex.sm="49.4" fxFlex.md="33" fxFlex.lg="24.7" fxFlex.xl="19.7">
        <dcwa-product-item [product]="p"></dcwa-product-item>
      </div>
    </ng-container>
  </div>
  `,
  styles: [
    `
      mat-grid-tile {
        background: red;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  /**
   * @param  {Article[]} products
   * @returns Article
   */
  @Input() products: Article[];

  /**
   * @param  {${MEDIUM_WIDTH_BREAKPOINT}px}
   */
  private mediaMatcher: MediaQueryList = matchMedia(
    `(max-width: ${MEDIUM_WIDTH_BREAKPOINT}px)`
  );

  /**
   * Default constructor.
   * @param  {ObservableMedia} privateobservableMedia
   */
  constructor(private logger: LoggerService) {
    this.log('constructor()');
  }

  /**
   * @returns boolean
   */
  isScreenMediumOrSmaller(): boolean {
    this.log('isScreenMediumOrSmaller()');
    return this.mediaMatcher.matches;
  }

  /**
   * @param  {number} index
   * @param  {ArticleData} article
   */
  trackArticle(index: number, article: ArticleData) {
    this.log('trackArticle()');
    return article ? article.product_id : undefined;
  }

  /**
   * @param  {string} message
   */
  private log(message: string): void {
    const timestamp = new Date().toISOString();
    this.logger.log(
      `[${timestamp}] - ProductListComponent:: ${message}`,
      'background: #222; color: yellow'
    );
  }
}
