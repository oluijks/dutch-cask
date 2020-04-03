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

// @todo show dialog or snackbar
function promptUser(event: any): boolean {
  return true;
}

// #region sw-activate
@Injectable({
  providedIn: SharedModule,
})
export class PromptUpdateService extends UnsubscribeOnDestroy {
  /**
   * Default constructor
   * @param  {SwUpdate} updates
   */
  constructor(updates: SwUpdate) {
    super();
    updates.available
      .pipe(takeUntil(this.d$))
      .subscribe((event: UpdateAvailableEvent) => {
        if (promptUser(event)) {
          updates.activateUpdate().then(_ => {
            // @todo: fix this, this might break the app!
            document.location.reload(true);
          });
        }
      });
  }
}
// #endregion sw-activate
