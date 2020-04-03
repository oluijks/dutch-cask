/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {ActionReducerMap} from '@ngrx/store';
import {cartReducer} from './cart.reducer';

export const reducers: ActionReducerMap<any> = {
  cart: cartReducer,
};
