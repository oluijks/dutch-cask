/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {SharedModule} from '../shared.module';
import {CheckoutRoutingModule} from './checkout-routing.module';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import {
  metaCardReducer,
  reducer,
  storeFeatureName,
} from './store/reducers/cart.reducer';

@NgModule({
  imports: [
    SharedModule,
    CheckoutRoutingModule,
    StoreModule.forFeature(storeFeatureName, reducer, {
      metaReducers: [metaCardReducer],
    }),
  ],
  declarations: [...fromContainers.collection, ...fromComponents.collection],
})
export class CheckoutModule {}
