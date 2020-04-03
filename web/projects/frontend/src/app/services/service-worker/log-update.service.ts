/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {UpdateAvailableEvent} from '@angular/service-worker/src/low_level';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeOnDestroy} from '../../classes/unsubscribe-on-destroy';
import {SharedModule} from '../../modules/shared.module';

// #region sw-update
@Injectable({
  providedIn: SharedModule,
})
export class LogUpdateService extends UnsubscribeOnDestroy {
  /**
   * Default constructor.
   * @param  {SwUpdate} updates
   */
  constructor(updates: SwUpdate) {
    super();
    updates.available
      .pipe(takeUntil(this.d$))
      .subscribe((event: UpdateAvailableEvent) => {
        console.log('[LogUpdateService]: current version is', event.current);
        console.log(
          '[LogUpdateService]: available version is',
          event.available
        );
      });
    updates.activated.pipe(takeUntil(this.d$)).subscribe(event => {
      console.log('[LogUpdateService]: old version was', event.previous);
      console.log('[LogUpdateService]: new version is', event.current);
    });
  }
}
// #endregion sw-update
