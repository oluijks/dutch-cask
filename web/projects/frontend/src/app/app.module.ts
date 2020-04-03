/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {ApiModule} from '@dc/api';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import * as fromComponents from './components';
import {ConfirmDialogComponent} from './components/shared/confirm-dialog.component';
import {CheckoutButtonComponent} from './modules/checkout/components/shared/checkout-button/checkout-button.component';
import {StaticPageComponent} from './modules/cms/elements/static-page/static-page.component';
import {CoreModule} from './modules/core.module';
import {SharedModule} from './modules/shared.module';

export function getLocalStorage() {
  return typeof window !== 'undefined' ? window.localStorage : null;
}

@NgModule({
  declarations: [
    ...fromComponents.collection,
    CheckoutButtonComponent,
    ConfirmDialogComponent,
    StaticPageComponent,
  ],
  imports: [
    ApiModule,
    CoreModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [{provide: 'LOCALSTORAGE', useFactory: getLocalStorage}],
  entryComponents: [
    fromComponents.LoadingSpinnerComponent,
    CheckoutButtonComponent,
    ConfirmDialogComponent,
    StaticPageComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
