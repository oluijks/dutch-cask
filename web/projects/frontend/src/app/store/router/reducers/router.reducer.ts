/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {RouterState, RouterStateUrl} from '../models/router-state.model';

export const routerFeatureName = 'router';

export const reducers: ActionReducerMap<RouterState> = {
  router: routerReducer,
};

export const getRouterState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
>(routerFeatureName);
