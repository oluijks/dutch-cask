/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {BillingComponent} from './billing/billing.component';
import {OrderReviewComponent} from './order-review/order-review.component';
import {PaymentFailedComponent} from './payment-failed/payment-failed.component';
import {PaymentSuccessComponent} from './payment-success/payment-success.component';
import {PaymentComponent} from './payment/payment.component';
import {DiscountCodeComponent} from './shared/discount-code/discount-code.component';
import {EstimateShippingTaxComponent} from './shared/estimate-shipping-tax/estimate-shipping-tax.component';
import {PriceBoxComponent} from './shared/price-box/price-box.component';
import {ShippingComponent} from './shipping/shipping.component';
import {CartToolbarComponent} from './shopping-cart/cart-toolbar/cart-toolbar.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';

export const collection: any[] = [
  BillingComponent,
  PaymentFailedComponent,
  OrderReviewComponent,
  PaymentSuccessComponent,
  PaymentComponent,
  DiscountCodeComponent,
  EstimateShippingTaxComponent,
  PriceBoxComponent,
  ShippingComponent,
  CartToolbarComponent,
  ShoppingCartComponent,
];

export * from './billing/billing.component';
export * from './order-review/order-review.component';
export * from './payment-failed/payment-failed.component';
export * from './payment-success/payment-success.component';
export * from './payment/payment.component';
export * from './shared/discount-code/discount-code.component';
export * from './shared/estimate-shipping-tax/estimate-shipping-tax.component';
export * from './shared/price-box/price-box.component';
export * from './shipping/shipping.component';
export * from './shopping-cart/cart-toolbar/cart-toolbar.component';
export * from './shopping-cart/shopping-cart.component';
