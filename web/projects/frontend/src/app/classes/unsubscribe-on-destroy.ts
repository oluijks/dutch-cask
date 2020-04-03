/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {environment} from '../../environments/environment';

export abstract class UnsubscribeOnDestroy implements OnDestroy {
  protected d$: Subject<any>;
  constructor() {
    if (!environment.production) {
      console.log(
        `%c[${new Date().toISOString()}] - UnsubscribeOnDestroy::constructor()`,
        'background: #222; color: yellow'
      );
    }
    this.d$ = new Subject<void>();
    const f = this.ngOnDestroy;
    this.ngOnDestroy = () => {
      f();
      this.d$.next();
      this.d$.complete();
    };
  }
  ngOnDestroy(): void {
    /* no-op */
  }
}
