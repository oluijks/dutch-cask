/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'dcwa-checkout-button',
  template: `
  <button
    routerLink="/checkout/cart"
    routerLinkActive="active"
    color="primary"
    mat-raised-button
    matBadgeColor="accent"
    matBadgePosition="after"
    [matBadge]="total"
  >
    <mat-icon>shopping_cart</mat-icon>
    <span>&nbsp;YOUR CART</span>
  </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutButtonComponent {
  @Input() total: number;
}
