/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'dcwa-price-box',
  template: `
  <mat-card>
    <mat-card-content>
      <div fxLayout="column" fxLayoutAlign="start stretch">
        <div fxFlexAlign="end">
          <mat-list>
            <mat-list-item>
              <h2 matLine>SUBTOTAL:&nbsp;&nbsp;<span>{{amount | currency}}</span></h2>
              <h2 matLine>DISCOUNT:&nbsp;&nbsp;<span>-$15.00</span></h2>
            </mat-list-item>
            <mat-divider></mat-divider>
          </mat-list>
        </div>
        <div fxFlexAlign="center">
          <mat-list>
            <mat-list-item>
              <h2 matLine>GRAND TOTAL EXCL. TAX:&nbsp;&nbsp;<span>{{amount | currency}}</span></h2>
              <h2 matLine>GRAND TOTAL INCL. TAX:&nbsp;&nbsp;<span>{{amount | currency}}</span></h2>
            </mat-list-item>
            <mat-divider></mat-divider>
          </mat-list>
        </div>
      </div>
    </mat-card-content>
    <mat-card-actions>
      <div fxFlex></div>
      <button mat-raised-button routerLink="/checkout" class="continue-shopping-button">
        <mat-icon>payment</mat-icon>
        <span>&nbsp;PROCEED TO CHECKOUT</span>
      </button>
    </mat-card-actions>
  </mat-card>
  `,
  styles: [
    `
      .price__grand {
        font-size: 20px !important;
        font-weight: 200 !important;
        margin: 0 0 6px;
      }
      .mat-card {
        padding: 0 24px 24px 24px;
      }
      .mat-card-actions,
      .mat-card-content,
      .mat-card-subtitle,
      .mat-card-title {
        margin-bottom: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceBoxComponent implements OnInit {
  @Input()
  amount: number;

  constructor() {}

  ngOnInit() {}
}
