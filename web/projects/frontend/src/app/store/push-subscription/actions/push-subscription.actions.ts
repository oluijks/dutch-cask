/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {Action} from '@ngrx/store';

export const IS_ALLOWED = '[Push] Is Allowed';
export const IS_BLOCKED = '[Push] Is Blocked';
export const IS_ENABLED = '[Push] Is Enabled';
export const IS_DISABLED = '[Push] Is Disabled';
export const IS_SUBSCRIBED = '[Push] Is Subscribed';
export const IS_UNSUBSCRIBED = '[Push] Is Unsubscribed';

export class IsPushAllowed implements Action {
  readonly type = IS_ALLOWED;
}

export class IsPushBlocked implements Action {
  readonly type = IS_BLOCKED;
}

export class IsPushEnabled implements Action {
  readonly type = IS_ENABLED;
}

export class IsPushDisabled implements Action {
  readonly type = IS_DISABLED;
}

export class IsSubscribed implements Action {
  readonly type = IS_SUBSCRIBED;
}

export class IsUnsubscribed implements Action {
  readonly type = IS_UNSUBSCRIBED;
}

export type PushSubscriptionActionsUnion =
  | IsPushAllowed
  | IsPushBlocked
  | IsPushEnabled
  | IsPushDisabled
  | IsSubscribed
  | IsUnsubscribed;
