/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {NgModule} from '@angular/core';
import {PreloadingStrategy, Route, RouterModule, Routes} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';
import {timer} from 'rxjs/internal/observable/timer';
import {flatMap} from 'rxjs/operators';
import * as fromComponents from './components';

export class AppPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    const loadRoute = delay =>
      delay ? timer(150).pipe(flatMap(_ => load())) : load();
    return route.data && route.data.preload
      ? loadRoute(route.data.delay)
      : of(null);
  }
}

const routes: Routes = [
  // General pages
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: fromComponents.HomeComponent,
    data: {page: 'home', title: 'Home'},
  },
  // (Lazy loaded) modules
  {
    path: 'checkout',
    loadChildren: './modules/checkout/checkout.module#CheckoutModule',
    data: {preload: true, delay: false},
  },
  {
    path: 'customer',
    loadChildren: './modules/customer/customer.module#CustomerModule',
    // data: {preload: true, delay: false},
  },
  {
    path: 'category',
    loadChildren: './modules/catalog/category/category.module#CategoryModule',
    // data: {preload: true, delay: false},
  },
  {
    path: 'products',
    loadChildren: './modules/catalog/product/product.module#ProductModule',
    // data: {preload: true, delay: true},
  },
  // Always keep this route second to last
  {
    path: '',
    loadChildren: './modules/cms/cms.module#CmsModule',
    data: {preload: true, delay: false},
  },
  // Always keep this route last
  {
    path: '**',
    component: fromComponents.NotFoundComponent,
    data: {page: '404', title: 'Page Not Found'},
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // @see https://github.com/angular/angular/commit/49c5234c6817ceae02b8bacb30adae99c45a49a9
      // @see https://medium.com/lacolaco-blog/introduce-router-scroller-in-angular-v6-1-ef34278461e9
      // @see https://github.com/angular/angular/issues/24547
      scrollPositionRestoration: 'top',
      preloadingStrategy: AppPreloadingStrategy,
    }),
  ],
  exports: [RouterModule],
  providers: [AppPreloadingStrategy],
})
export class AppRoutingModule {}
