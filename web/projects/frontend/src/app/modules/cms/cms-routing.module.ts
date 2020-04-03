/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared.module';
import * as fromComponents from './components';

const routes: Routes = [
  {
    path: ':id',
    component: fromComponents.PageComponent,
    // data: {page: 's', title: 'id'},
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmsRoutingModule {}
