/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class PageHeaderService {
  private _title$ = new BehaviorSubject<string>('Home');

  /**
   * @returns string
   */
  get title(): string {
    return this._title$.getValue();
  }

  /**
   * @param  {} value
   */
  set title(value) {
    this._title$.next(value);
  }
}
