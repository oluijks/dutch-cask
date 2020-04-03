/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {AppComponent} from '../app.component';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {DemoMessageComponent} from './shared/demo-message.component';
import {FooterComponent} from './shared/footer/footer.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner.component';
import {CategoryMenuItemComponent} from './shared/menus/category-menu-item/category-menu-item';
import {CategoryComponent} from './shared/menus/category/category.component';
import {PageHeaderComponent} from './shared/page-header.component';

export const collection: any[] = [
  AppComponent,
  HomeComponent,
  FooterComponent,
  CategoryComponent,
  NotFoundComponent,
  PageHeaderComponent,
  DemoMessageComponent,
  LoadingSpinnerComponent,
  CategoryMenuItemComponent,
];

export * from '../app.component';
export * from '../modules/checkout/components';
export * from './home/home.component';
export * from './not-found/not-found.component';
export * from './shared/demo-message.component';
export * from './shared/footer/footer.component';
export * from './shared/loading-spinner.component';
export * from './shared/menus/category-menu-item/category-menu-item';
export * from './shared/menus/category/category.component';
export * from './shared/page-header.component';
