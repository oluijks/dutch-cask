/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {RouterStateSerializer} from '@ngrx/router-store';
import * as fromRouterStore from '../router';

export class CustomRouterSerializer
  implements RouterStateSerializer<fromRouterStore.RouterStateUrl> {
  /**
   * @param  {RouterStateSnapshot} routerState
   */
  serialize(routerState: RouterStateSnapshot): fromRouterStore.RouterStateUrl {
    let route: ActivatedRouteSnapshot = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: {queryParams},
    } = routerState;
    const {params} = route;
    const pageTitle = route.data.title;
    const pageName = route.data.page;
    const metaTags = route.data.meta;

    return {url, params, queryParams, pageTitle, pageName, metaTags};
  }
}
