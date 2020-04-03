/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {Action} from '@ngrx/store';
import * as fromCheckoutModels from '../models';

export const ADD_ITEM = '[CART] Add cart item';
export const UPDATE_ITEM = '[CART] Update cart item';
export const REMOVE_ITEM = '[CART] Remove cart item';
export const EMPTY_CARD = '[CART] Clear cart';

export class AddItem implements Action {
  readonly type = ADD_ITEM;
  constructor(public cart: fromCheckoutModels.CartModel) {}
}

export class UpdateItem implements Action {
  readonly type = UPDATE_ITEM;
  constructor(
    public id: string,
    public changes: Partial<fromCheckoutModels.CartModel>
  ) {}
}

export class RemoveItem implements Action {
  readonly type = REMOVE_ITEM;
  constructor(public id: string) {}
}

export class ClearCart implements Action {
  readonly type = EMPTY_CARD;
  constructor(public cart: fromCheckoutModels.CartModel) {}
}

export type CartActions = AddItem | UpdateItem | RemoveItem | ClearCart;
