/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Memoize} from 'lodash-decorators';
import {Observable} from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import {LoggerService} from '../../../../../services/logger.service';
import * as fromCheckoutActions from '../../../../checkout/store/actions';
import * as fromCheckoutModels from '../../../../checkout/store/models';
import * as fromCart from '../../../../checkout/store/reducers/cart.reducer';
import {ArticleData} from '../../../product/models/article.model';

@Component({
  selector: 'dcwa-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent implements OnInit {
  /**
   * @param  {ArticleData;} product
   * @returns ArticleData
   */
  @Input() product: ArticleData;

  /**
   * @type {boolean}
   */
  isActive: boolean = false;

  /**
   * @type {string}
   */
  ciu: string = environment.cdn.images.url;

  cartIds$: Observable<any[]>;

  /**
   * Default constructor.
   * @param  {LoggerService} privatelogger
   */
  constructor(
    private logger: LoggerService,
    private store: Store<fromCart.State>
  ) {
    this.log('constructor()');
    this.cartIds$ = this.store.pipe(select(fromCart.selectIds));
  }

  ngOnInit(): void {}

  /**
   * @returns boolean
   */
  @Memoize()
  hasAdditionalPhotos(product: ArticleData): boolean {
    this.log('hasAdditionalPhotos()');
    return product.attributes.photos.additional.length > 0 ? true : false;
  }

  /**
   * @note this is for testing only
   * @param  {ArticleData} product
   */
  addToShoppingCart(product: ArticleData) {
    this.log('addToShoppingCart()');

    const item: fromCheckoutModels.CartModel = {
      id: product.product_id,
      order_item: {
        main_photo: this.ciu + product.attributes.photos.main,
        product_name: product.attributes.name,
        prices: product.attributes.prices,
        qty: 1,
      },
    };

    this.store.dispatch(new fromCheckoutActions.AddItem(item));
  }

  /**
   * @param  {string} message
   */
  private log(message: string): void {
    const timestamp = new Date().toISOString();
    this.logger.log(
      `[${timestamp}] - ProductItemComponent:: ${message}`,
      'background: #222; color: yellow'
    );
  }
}
