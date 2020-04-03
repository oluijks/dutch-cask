/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {Injectable} from '@angular/core';

export const PUSH_NOTIFICATION_STORAGE_KEY = 'PushNotificationSubscriptionId';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /**
   * @returns string | null
   */
  getPushSubscriptionId(): string | null {
    return localStorage.getItem(PUSH_NOTIFICATION_STORAGE_KEY);
  }

  /**
   * @param  {string} id
   * @returns void
   */
  setPushSubscriptionId(id: string): void {
    localStorage.setItem(PUSH_NOTIFICATION_STORAGE_KEY, id);
  }

  /**
   * @returns void
   */
  removePushSubscriptionId(): void {
    if (this.getPushSubscriptionId) {
      localStorage.removeItem(PUSH_NOTIFICATION_STORAGE_KEY);
    }
  }

  get storageAgreement() {
    return JSON.parse(localStorage.getItem('dcwa-storage-agreement'));
  }

  set storageAgreement(agree: boolean) {
    localStorage.setItem('dcwa-storage-agreement', JSON.stringify(agree));
  }
}
