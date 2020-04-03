/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

export interface CartModel {
  id: string;
  order_item: {
    main_photo: string;
    product_name: string;
    prices: {
      currency_code: string;
      price: number;
    };
    qty: number;
  };
}
