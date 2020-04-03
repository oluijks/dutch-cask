/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SafePipe} from '../../pipes/ safe.pipe';
import {SharedModule} from '../shared.module';
import {CmsRoutingModule} from './cms-routing.module';
import * as fromComponents from './components';

@NgModule({
  imports: [SharedModule, CmsRoutingModule],
  declarations: [...fromComponents.collection, SafePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CmsModule {}
