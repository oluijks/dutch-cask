/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {ProductItemComponent} from './product-item/product-item.component';
import {ProductListComponent} from './product-list/product-list.component';

export const collection: any[] = [ProductListComponent, ProductItemComponent];

export * from '../../../../components/shared/loading-spinner.component';
export * from './product-item/product-item.component';
export * from './product-list/product-list.component';
