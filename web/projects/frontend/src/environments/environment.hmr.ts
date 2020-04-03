/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  testing: false,
  development: true,
  hmr: true,
  appTitle: 'Dutch Cask',
  appVersion: '1.0.0-dev',
  site: {
    animations: false,
  },
  api: {
    // baseUrl: 'http://192.168.1.64:3333/',
    baseUrl: 'https://api.dutch-cask.nl:8443/',
    resources: {
      staticPages: 'api/static-pages',
      products: 'api/products',
      pushSubscriptions: 'api/push/subscriptions',
    },
  },
  cdn: {
    images: {
      // url: 'http://192.168.1.64:3000/images/',
      url: 'https://cdn.dutch-cask.nl:3000/images/',
    },
  },
  serviceWorker: {
    checkForUpdateInterval: 0,
  },
  pushNotification: {
    vapidSubject: 'http://localhost',
    vapidKeys: {
      privateKey: 'dCbcO1jsHCILWFX0s8pCTg8fUKTMK4YJGhw7PRbIP9o',
      publicKey:
        'BELeRsA9wQSYln-zWYJrOTX8x_g3bzMVWdTsAN6CRcyoh91CnzycfIt2EasGL70_A-41R_Fwi3N4Zk_K72aHj4Q',
    },
  },
  defaultLanguage: 'en',
  defaultPageTitle: 'Home',
};
