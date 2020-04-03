/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import * as fromCheckoutActions from '../actions/cart.actions';
import * as fromCheckoutModels from '../models';

export const storeFeatureName = 'cart';
export const cartAdapter = createEntityAdapter<fromCheckoutModels.CartModel>();
export interface State extends EntityState<fromCheckoutModels.CartModel> {
  selectedUserId: number | null;
}

const defaultCart = {
  ids: [],
  entities: {},
  selectedUserId: null,
};

export const initialState: State = cartAdapter.getInitialState(defaultCart);

export function reducer(
  state: State = initialState,
  action: fromCheckoutActions.CartActions
): State {
  switch (action.type) {
    case fromCheckoutActions.ADD_ITEM:
      return cartAdapter.addOne(action.cart, state);

    case fromCheckoutActions.UPDATE_ITEM:
      return cartAdapter.updateOne(
        {
          id: action.id,
          changes: action.changes,
        },
        state
      );

    case fromCheckoutActions.REMOVE_ITEM:
      return cartAdapter.removeOne(action.id, state);

    case fromCheckoutActions.EMPTY_CARD:
      return cartAdapter.removeAll({...state});

    default:
      return state;
  }
}

/** Wrapper around reducer to preserve cart */
export function metaCardReducer(
  reducerFunc: (state: State, action: fromCheckoutActions.CartActions) => State
) {
  return function(
    state: State | undefined,
    action: fromCheckoutActions.CartActions
  ) {
    if (state === undefined) {
      const persistedState = localStorage.getItem('cart');
      return persistedState
        ? JSON.parse(persistedState)
        : reducerFunc(state, action);
    }
    const nextState = reducerFunc(state, action);
    localStorage.setItem('cart', JSON.stringify(nextState));
    return nextState;
  };
}

export const cartReducer = metaCardReducer(reducer);

export const getCartState = createFeatureSelector<State>('cart');

export const {
  selectAll,
  selectIds,
  selectTotal,
  selectEntities,
} = cartAdapter.getSelectors(getCartState);
