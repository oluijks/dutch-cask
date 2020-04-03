/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {LoggerService} from '../../services/logger.service';

@Component({
  selector: 'dcwa-demo-message',
  template: `
  <ng-container *ngIf="showMessage">
    <mat-toolbar fxShow.lt-md="false" fxShow.gt-md="true" class="demo-message" color="accent" fxLayout="row" fxLayoutAlign="center center">
      <mat-icon>warning</mat-icon>
      <span>This is a demo webshop. Your orders will not be fulfilled.</span>
    </mat-toolbar>
    <mat-toolbar fxShow="false" fxShow.lt-md="true" class="demo-message demo-message__mobile" color="accent" fxLayout="column"
      fxLayoutAlign="center center">
      <mat-icon>warning</mat-icon>
      <span>This is a demo webshop.<br>Your orders will not be fulfilled.</span>
    </mat-toolbar>
  </ng-container>
  `,
  styles: [
    `
      .demo-message {
        height: auto;
        min-height: 64px;
        padding: 6px;
        color: #fff;
      }
      .demo-message span {
        font-size: 16px;
        font-weight: 400;
        margin-left: 5px;
      }
      .demo-message__mobile {
        line-height: 1.3;
        text-align: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoMessageComponent {
  @Input() showMessage: boolean;

  /**
   * Default constructor.
   */
  constructor(private logger: LoggerService) {
    this.log('constructor()');
  }

  /**
   * @param  {string} message
   */
  private log(message: string): void {
    const timestamp = new Date().toISOString();
    this.logger.log(
      `[${timestamp}] - ${this.constructor.name}::${message}`,
      'background: #222; color: yellow'
    );
  }
}
