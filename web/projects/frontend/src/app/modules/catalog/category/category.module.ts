/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CategoryRoutingModule} from './category-routing.module';
import * as fromComponents from './components';
import * as fromContainers from './containers';
@NgModule({
  imports: [CommonModule, CategoryRoutingModule],
  declarations: [...fromContainers.collection, ...fromComponents.collection],
})
export class CategoryModule {}
