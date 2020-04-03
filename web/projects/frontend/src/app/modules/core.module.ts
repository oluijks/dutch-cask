/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ServiceWorkerModule} from '@angular/service-worker';
import {EffectsModule} from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {storeFreeze} from 'ngrx-store-freeze';
import {environment} from '../../environments/environment';
import {AuthInterceptor} from '../interceptors/auth.interceptor';
import {GeneralInterceptor} from '../interceptors/general.interceptor';
import {WINDOW_PROVIDERS} from '../services/window.service';
import * as fromPushSubscriptionStore from '../store/push-subscription';
import * as fromRouterStore from '../store/router';
import {SharedModule} from './shared.module';
export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  imports: [
    SharedModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(fromRouterStore.reducers, {metaReducers}),
    StoreModule.forFeature(
      fromPushSubscriptionStore.pushSubscriptionFeatureName,
      fromPushSubscriptionStore.pushSubscriptionReducers
    ),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    !environment.production
      ? StoreDevtoolsModule.instrument({logOnly: environment.production})
      : [],
    StoreDevtoolsModule.instrument(),
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    Meta,
    Title,
    WINDOW_PROVIDERS,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: GeneralInterceptor, multi: true},
    {
      provide: RouterStateSerializer,
      useClass: fromRouterStore.CustomRouterSerializer,
    },
  ],
})
export class CoreModule {}
