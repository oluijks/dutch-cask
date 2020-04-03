/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import * as fromContainers from './containers';
import {ArticleResolver} from './store/article.resolver';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.ProductsComponent,
    resolve: {entities: ArticleResolver},
    data: {page: 'products', title: 'ALL PRODUCTS'},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
