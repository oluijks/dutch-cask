/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'dcwa-cart-toolbar',
  template: `
  <div fxLayout="column"
       fxLayout.gt-sm="row"
       fxLayoutAlign="start"
       fxLayoutAlign.gt-sm="end"
       fxLayoutGap="20px"
       style="padding-bottom: 20px;">
    <button (tap)="clearCart()" mat-button>
      <mat-icon>remove_shopping_cart</mat-icon>
    </button>
    <button mat-raised-button color="primary">
      <mat-icon>link</mat-icon>
      <span>&nbsp;REQUEST FOR QUOTE</span>
    </button>
    <button mat-raised-button routerLink="/checkout" class="continue-shopping-button">
      <mat-icon>payment</mat-icon>
      <span>&nbsp;PROCEED TO CHECKOUT</span>
    </button>
  </div>
  `,
  styles: [],
})
export class CartToolbarComponent {
  @Output() clear = new EventEmitter<boolean>();

  clearCart() {
    this.clear.emit(true);
  }
}
