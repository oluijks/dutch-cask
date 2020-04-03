/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'dcwa-discount-code',
  template: `
  <mat-card>
    <mat-card-content>
      <div fxLayout.xs="column" fxLayout.gt-xs="row" fxLayoutAlign.xs="stretch" fxLayoutAlign.gt-xs="center center" fxLayoutGap.gt-xs="20px">
        <div>DISCOUNT CODE:</div>
        <div fxFlex>
          <mat-form-field style="width: 100%;">
            <input matInput>
          </mat-form-field>
        </div>
        <div>
          <button mat-raised-button color="primary">APPLY</button>
        </div>
      </div>
    </mat-card-content>
  </mat-card>
  `,
  styles: [],
})
export class DiscountCodeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
