/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromPushNotificationActions from '../actions/push-subscription.actions';
import * as fromPushNotificationModels from '../models/push-subscription-state.model';
import {SubscriptionState} from '../models/push-subscription-state.model';

export const pushSubscriptionFeatureName = 'push_subscription';

export const initialPushSubscriptonState: fromPushNotificationModels.PushSubscriptonState = {
  isPushAllowed: true,
  isPushEnabled: false,
  isSubscribed: false,
};

export const pushSubscriptionReducers: ActionReducerMap<SubscriptionState> = {
  state: pushSubscriptonReducer,
};

export function pushSubscriptonReducer(
  state = initialPushSubscriptonState,
  action: fromPushNotificationActions.PushSubscriptionActionsUnion
): fromPushNotificationModels.PushSubscriptonState {
  switch (action.type) {
    case fromPushNotificationActions.IS_ALLOWED: {
      return {
        ...state,
        isPushAllowed: true,
      };
    }
    case fromPushNotificationActions.IS_BLOCKED: {
      return {
        ...state,
        isPushAllowed: false,
      };
    }
    case fromPushNotificationActions.IS_ENABLED: {
      return {
        ...state,
        isPushEnabled: true,
      };
    }
    case fromPushNotificationActions.IS_DISABLED: {
      return {
        ...state,
        isPushEnabled: false,
      };
    }
    case fromPushNotificationActions.IS_SUBSCRIBED: {
      return {
        ...state,
        isSubscribed: true,
      };
    }
    case fromPushNotificationActions.IS_UNSUBSCRIBED: {
      return {
        ...state,
        isSubscribed: false,
      };
    }
  }
  return state;
}

export const selectPushIsAllowed = (
  state: fromPushNotificationModels.PushSubscriptonState
) => state.isPushAllowed;

export const selectPushIsEnabled = (
  state: fromPushNotificationModels.PushSubscriptonState
) => state.isPushEnabled;

export const selectPushIsSubscribed = (
  state: fromPushNotificationModels.PushSubscriptonState
) => state.isSubscribed;

export const getSubscriptionState = createFeatureSelector<SubscriptionState>(
  pushSubscriptionFeatureName
);

// Get subscription state for selectors
export const selectSubscriptionState = createSelector(
  getSubscriptionState,
  (state: SubscriptionState) => state.state
);

// Selectors
export const selectIsPushAllowedState = createSelector(
  selectSubscriptionState,
  selectPushIsAllowed
);

export const selectIsPushEnabledState = createSelector(
  selectSubscriptionState,
  selectPushIsEnabled
);

export const selectIsSubscribedState = createSelector(
  selectSubscriptionState,
  selectPushIsSubscribed
);
