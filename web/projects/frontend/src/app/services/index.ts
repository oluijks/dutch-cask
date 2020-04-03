/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {LocalStorageService} from './local-storage.service';
import {LoggerService} from './logger.service';
import {PageHeaderService} from './page-header.service';
import {CheckForUpdateService} from './service-worker/check-for-update.service';
import {LogUpdateService} from './service-worker/log-update.service';
import {PromptUpdateService} from './service-worker/prompt-update.service';
import {PushSubscriptionService} from './service-worker/push-subscription.service';

export const collection: any[] = [
  LoggerService,
  LogUpdateService,
  LocalStorageService,
  PromptUpdateService,
  CheckForUpdateService,
  PushSubscriptionService,
  PageHeaderService,
];

export * from './local-storage.service';
export * from './logger.service';
export * from './page-header.service';
export * from './service-worker/check-for-update.service';
export * from './service-worker/log-update.service';
export * from './service-worker/prompt-update.service';
export * from './service-worker/push-subscription.service';
