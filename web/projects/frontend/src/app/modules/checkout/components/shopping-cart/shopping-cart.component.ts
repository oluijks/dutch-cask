/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeOnDestroy} from '../../../../classes/unsubscribe-on-destroy';
import {ConfirmDialogComponent} from '../../../../components/shared/confirm-dialog.component';
import * as fromActions from '../../store/actions/cart.actions';
import {CartModel} from '../../store/models/cart.model';
import * as fromCart from '../../store/reducers/cart.reducer';

@Component({
  selector: 'dcwa-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartComponent extends UnsubscribeOnDestroy
  implements OnInit {
  total$: Observable<number>;
  amount$: Observable<number>;
  dialogRef: MatDialogRef<any>;
  cart$: Observable<CartModel[]>;
  dataSource = new MatTableDataSource<CartModel>();
  displayedColumns = ['image', 'product_name', 'qty', 'prices', 'edit'];

  /**
   * Default constructor.
   * @param  {Store<fromCart.State>} privatestore
   */
  constructor(private store: Store<fromCart.State>, public dialog: MatDialog) {
    super();
    this.cart$ = this.store.pipe(select(fromCart.selectAll));
    this.total$ = this.store.pipe(select(fromCart.selectTotal));
  }

  /**
   * @returns void
   */
  ngOnInit(): void {
    this.cart$.pipe(takeUntil(this.d$)).subscribe((cartItem: any) => {
      this.amount$ = cartItem.reduce((acc, item: CartModel): number => {
        return acc + (item.order_item.qty * item.order_item.prices.price) / 100;
      }, 0);
    });
  }

  /**
   * Dispatch remove item action to store.
   * @param  {string} id
   * @returns void
   */
  removeCartItem(id: string): void {
    this.store.dispatch(new fromActions.RemoveItem(id));
  }

  /**
   * Dispatch update item action to store
   * @todo   Partial doesn't seem to work
   *         that's why we send the whole
   *         card object to the cartstore
   *         Have to refactor this later.
   * @param  {CartModel} cart
   * @param  {any} qty
   * @returns void
   */
  updateQuantity(cart: CartModel, qty: any): void {
    const item = {
      order_item: {
        main_photo: cart.order_item.main_photo,
        product_name: cart.order_item.product_name,
        prices: {
          currency_code: cart.order_item.prices.currency_code,
          price: cart.order_item.prices.price,
        },
        qty: qty,
      },
    };
    this.store.dispatch(new fromActions.UpdateItem(cart.id, item));
  }

  /**
   * Dispatch a clear cart action on a clear event
   * @param  {CartModel} cart
   * @returns void
   */
  onClearCart(event: boolean): void {
    if (event) {
      this.showConfirmDialog();
    }
  }

  private showConfirmDialog() {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Empty your cart',
        question: 'Are you sure?',
      },
    });
    this.dialogRef
      .afterClosed()
      .pipe(takeUntil(this.d$))
      .subscribe((result: boolean) => {
        if (result) {
          this.store.dispatch(new fromActions.ClearCart(null));
        }
        this.dialogRef = null;
      });
  }
}
