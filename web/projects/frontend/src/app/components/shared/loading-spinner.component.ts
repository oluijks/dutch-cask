/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LoggerService} from '../../services/logger.service';

@Component({
  selector: 'dcwa-loading-spinner',
  template: `
    <div fxLayout="row" fxLayoutAlign="center center" class="spinner-container">
      <mat-spinner class="spinner"></mat-spinner>
    </div>
  `,
  styles: [
    `
      .spinner-container {
        height: 100vh;
      }
      .spinner {
        z-index: 999;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinnerComponent {
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
