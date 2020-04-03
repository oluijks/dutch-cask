/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {ApplicationRef, Injectable, OnDestroy} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {interval} from 'rxjs/internal/observable/interval';
import {Subject} from 'rxjs/internal/Subject';
import {takeUntil} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {UnsubscribeOnDestroy} from '../../classes/unsubscribe-on-destroy';
import {SharedModule} from '../../modules/shared.module';
import {LoggerService} from '../logger.service';

// #region sw-check-update
@Injectable({
  providedIn: SharedModule,
})
export class CheckForUpdateService extends UnsubscribeOnDestroy
  implements OnDestroy {
  private onDestroy = new Subject<void>();
  /**
   * Default constructor.
   * @param  {SwUpdate} privateupdates
   * @param  {ApplicationRef} privateapplicationRef
   */
  constructor(
    private logger: LoggerService,
    private updates: SwUpdate,
    private applicationRef: ApplicationRef
  ) {
    super();
    if (!environment.development) {
      this.applicationRef.isStable
        .pipe(takeUntil(this.d$))
        .subscribe((isStable: boolean) => {
          if (isStable) {
            interval(
              environment.serviceWorker.checkForUpdateInterval
            ).subscribe(_ => {
              this.log('Checking for update...');
              this.updates.checkForUpdate();
            });
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  private log(message: string) {
    const timestamp = new Date().toISOString();
    this.logger.log(
      `[SwUpdates - ${timestamp}]: ${message}`,
      'background: #222; color: yellow'
    );
  }
}
// #endregion sw-check-update
