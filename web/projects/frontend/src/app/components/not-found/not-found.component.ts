/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PageHeaderService} from '../../services';
import {LoggerService} from '../../services/logger.service';

@Component({
  selector: 'dcwa-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  /**
   * Default constructor.
   */
  constructor(
    private logger: LoggerService,
    private pageHeaderService: PageHeaderService
  ) {
    this.log('constructor()');
    this.pageHeaderService.title = '...';
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
