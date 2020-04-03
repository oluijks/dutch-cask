/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SwPush} from '@angular/service-worker';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {throwError} from 'rxjs/internal/observable/throwError';
import {catchError} from 'rxjs/internal/operators/catchError';
import {map} from 'rxjs/internal/operators/map';
import {take} from 'rxjs/internal/operators/take';
import {takeUntil} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {UnsubscribeOnDestroy} from '../../classes/unsubscribe-on-destroy';
import {SharedModule} from '../../modules/shared.module';
import {
  IsPushBlocked,
  IsPushDisabled,
  IsPushEnabled,
  IsSubscribed,
  IsUnsubscribed,
  SubscriptionState,
} from '../../store/push-subscription';
import {LocalStorageService} from '../local-storage.service';

@Injectable({
  providedIn: SharedModule,
})
export class PushSubscriptionService extends UnsubscribeOnDestroy {
  /**
   * Default constructor
   * @param  {SwPush} privateswPush
   * @param  {HttpClient} privatehttpClient
   * @param  {LocalStorageService} privatelocalStorageService
   * @param  {Store<fromPushSubscriptionStore.SubscriptionState>} privatepushSubscriptionStore
   */
  constructor(
    private swPush: SwPush,
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private pushSubscriptionStore: Store<SubscriptionState>
  ) {
    super();
    if (this.swPush.isEnabled) {
      this.pushSubscriptionStore.dispatch(new IsPushEnabled());
    } else {
      this.pushSubscriptionStore.dispatch(new IsPushDisabled());
    }
  }

  /**
   * @returns void
   */
  subscribeForPushNotifications(): void {
    this.swPush
      .requestSubscription({
        serverPublicKey: environment.pushNotification.vapidKeys.publicKey,
      })
      .then((pushSubscription: PushSubscription) => {
        this.saveSubscription(pushSubscription)
          .pipe(takeUntil(this.d$))
          .subscribe((id: string) => {
            if (id) {
              this.localStorageService.setPushSubscriptionId(id);
              this.pushSubscriptionStore.dispatch(new IsSubscribed());
            } else {
              this.pushSubscriptionStore.dispatch(new IsUnsubscribed());
            }
          });
      })
      .catch((error: DOMException) => {
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
          this.pushSubscriptionStore.dispatch(new IsPushBlocked());
        }
      });
  }

  /**
   * @returns void
   */
  unsubscribeForPushNotifications(): void {
    this.swPush.subscription
      .pipe(
        takeUntil(this.d$),
        take(1)
      )
      .subscribe((pushSubscription: PushSubscription | null) => {
        if (pushSubscription) {
          this.removeSubscription()
            .pipe(takeUntil(this.d$))
            .subscribe((id: string) => {
              if (id) {
                pushSubscription
                  .unsubscribe()
                  .then((success: boolean) => {
                    this.localStorageService.removePushSubscriptionId();
                    this.pushSubscriptionStore.dispatch(new IsUnsubscribed());
                  })
                  .catch((error: any) => console.error(error));
              }
            });
        }
      });
  }

  /**
   * @param  {PushSubscription} subscription
   * @returns Observable
   */
  private saveSubscription(subscription: PushSubscription): Observable<any> {
    return this.httpClient
      .post<PushSubscription>(
        `${environment.api.baseUrl}${
          environment.api.resources.pushSubscriptions
        }`,
        subscription
      )
      .pipe(
        map((response: any) => {
          return response._id;
        }),
        catchError((error: any) => throwError(error.json()))
      );
  }

  /**
   * @returns Observable
   */
  private removeSubscription(): Observable<any> {
    return this.httpClient
      .delete<any>(
        `${environment.api.baseUrl}${
          environment.api.resources.pushSubscriptions
        }/${this.localStorageService.getPushSubscriptionId()}`
      )
      .pipe(
        map((response: any) => {
          return response.data[0].id;
        }),
        catchError((error: any) => throwError(error.json()))
      );
  }
}
