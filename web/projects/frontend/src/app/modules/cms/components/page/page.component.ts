/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {takeUntil} from 'rxjs/internal/operators/takeUntil';
import {UnsubscribeOnDestroy} from '../../../../classes/unsubscribe-on-destroy';
import {LoggerService} from '../../../../services/logger.service';
import * as fromRouterStore from '../../../../store/router';

@Component({
  selector: 'dcwa-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent extends UnsubscribeOnDestroy implements OnInit {
  staticPage$ = new BehaviorSubject<string>('');

  constructor(
    private logger: LoggerService,
    private routerStore: Store<fromRouterStore.RouterStateUrl>
  ) {
    super();
    this.log('constructor()');
  }

  ngOnInit(): void {
    this.log('ngOnInit()');
    this.routerStore
      .pipe(
        takeUntil(this.d$),
        select(fromRouterStore.getRouterState)
      )
      .subscribe((routerState: {state: fromRouterStore.RouterStateUrl}) => {
        this.staticPage$.next(routerState.state.params.id);
      });
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
