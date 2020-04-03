/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {SharedModule} from '../../shared.module';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import {ProductRoutingModule} from './product-routing.module';
import {articlesEffects, productsFeatureName, productsReducers} from './store';
import {ArticleResolver} from './store/article.resolver';

@NgModule({
  imports: [
    SharedModule,
    ProductRoutingModule,
    EffectsModule.forFeature(articlesEffects),
    StoreModule.forFeature(productsFeatureName, productsReducers),
  ],
  declarations: [...fromContainers.collection, ...fromComponents.collection],
  providers: [ArticleResolver],
})
export class ProductModule {}
