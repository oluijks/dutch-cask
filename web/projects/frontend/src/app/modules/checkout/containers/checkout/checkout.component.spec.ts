/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {InjectionToken} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatIconModule} from '@angular/material/icon';
import {
  ReducerManager,
  ReducerManagerDispatcher,
  Store,
  StoreModule,
} from '@ngrx/store';
import {
  metaCardReducer,
  reducer,
  storeFeatureName,
} from '../../store/reducers/cart.reducer';
import {CheckoutComponent} from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        StoreModule.forFeature(storeFeatureName, reducer, {
          metaReducers: [metaCardReducer],
        }),
      ],

      declarations: [CheckoutComponent],
      providers: [
        InjectionToken,
        {provide: Store, useClass: Store},
        ReducerManager,
        ReducerManagerDispatcher,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create the checkout component', () => {
  //   expect(component).toBeTruthy();
  // });
});
