/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

export const environment = {
  production: true,
  testing: false,
  development: false,
  hmr: false,
  appTitle: 'Dutch Cask',
  appVersion: '1.0.0-prod',
  api: {
    baseUrl: 'https://api.dutch-cask.nl:8443/',
    resources: {
      staticPages: 'api/static-pages',
      products: 'api/products',
      pushSubscriptions: 'api/push/subscriptions',
    },
  },
  cdn: {
    images: {
      url: 'https://cdn.dutch-cask.nl:3000/images/',
    },
  },
  serviceWorker: {
    // 6 hours 1000 * 60 * 60 * 6,
    checkForUpdateInterval: 60 * 60 * 1000,
  },
  pushNotification: {
    vapidSubject: 'https://dutch-cask.nl',
    vapidKeys: {
      privateKey: 'dCbcO1jsHCILWFX0s8pCTg8fUKTMK4YJGhw7PRbIP9o',
      publicKey:
        'BELeRsA9wQSYln-zWYJrOTX8x_g3bzMVWdTsAN6CRcyoh91CnzycfIt2EasGL70_A-41R_Fwi3N4Zk_K72aHj4Q',
    },
  },
  defaultLanguage: 'en',
  defaultPageTitle: 'Home',
};
