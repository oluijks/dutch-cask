/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import * as fromComponents from './components';
import * as fromContainers from './containers';
const routes: Routes = [
  {
    path: 'cart',
    component: fromComponents.ShoppingCartComponent,
    data: {page: 'cart', title: 'Your Cart'},
  },
  {
    path: '',
    component: fromContainers.CheckoutComponent,
    data: {page: 'checkout', title: 'Checkout'},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
