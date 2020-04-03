/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {ErrorHandler, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  /**
   * Default constructor.
   * @param  {ErrorHandler} privateerrorHandler
   */
  constructor(private errorHandler: ErrorHandler) {}

  /**
   * @param  {any} value
   * @param  {any[]} ...rest
   */
  log(value: any, ...rest: any[]) {
    if (!environment.production) {
      console.log(`%c${value}`, ...rest);
    }
  }

  /**
   * @param  {Error} error
   */
  error(error: Error) {
    this.errorHandler.handleError(error);
  }

  /**
   * @param  {any} value
   * @param  {any[]} ...rest
   */
  warn(value: any, ...rest: any[]) {
    console.warn(value, ...rest);
  }
}
