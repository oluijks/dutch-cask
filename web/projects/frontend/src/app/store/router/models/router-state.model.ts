/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {Params} from '@angular/router';
import {RouterReducerState} from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  pageTitle: string;
  pageName: string;
  metaTags: {
    description: string;
  };
}

export interface RouterState {
  router: RouterReducerState<RouterStateUrl>;
}
