/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {NgModule} from '@angular/core';
import {SharedModule} from '../shared.module';
import {CustomerRoutingModule} from './customer-routing.module';

@NgModule({
  imports: [SharedModule, CustomerRoutingModule],
  declarations: [],
})
export class CustomerModule {}
