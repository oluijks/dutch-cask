/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {
  ApplicationRef,
  Component,
  Inject,
  Injector,
  OnInit,
  VERSION,
  ViewEncapsulation,
} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Title} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {filter} from 'rxjs/internal/operators/filter';
import {takeUntil} from 'rxjs/operators';
import {BUILD} from '../environments/build';
import {environment} from '../environments/environment';
import {UnsubscribeOnDestroy} from './classes/unsubscribe-on-destroy';
import * as fromCart from './modules/checkout/store/reducers/cart.reducer';
import {StaticPageComponent} from './modules/cms/elements/static-page/static-page.component';
import * as fromServices from './services';
import {PageHeaderService} from './services/page-header.service';
import {WINDOW} from './services/window.service';
import * as fromPushSubStore from './store/push-subscription';
import * as fromRouterStore from './store/router';
const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'dcwa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends UnsubscribeOnDestroy implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(
    `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
  );
  showDemoMessage: boolean;
  isPushEnabled$: Observable<boolean>;
  isPushAllowed$: Observable<boolean>;
  isSubscribed$: Observable<boolean>;
  appTitle: string = environment.appTitle.toUpperCase();
  appVersion: string = `${BUILD.version}-build.${BUILD.hash}`;
  angVersion: string = VERSION.full;
  toolbarColor: string = '';
  navList: Array<any> = [
    {link: '/', tooltip: 'HOME', icon: 'home'},
    {link: '/', tooltip: 'MY ACCOUNT', icon: 'account_box'},
    {link: '/checkout/cart', tooltip: 'SHOPPING CART', icon: 'shopping_cart'},
    {link: '/about', tooltip: 'ABOUT US', icon: 'info_outline'},
  ];
  mqState: string = '';
  snackBarRef;
  cartTotal$: Observable<number>;

  /**
   * Default constructor.
   * @param  {Router} privaterouter
   * @param  {Injector} privateinjector
   * @param  {Title} privatetitleService
   * @param  {ObservableMedia} privatemedia
   * @param  {} @Inject(WINDOW
   * @param  {Window} privatewindow
   * @param  {fromServices.LoggerService} privatelogger
   * @param  {Store<fromRouterStore.RouterStateUrl>} privaterouterStore
   * @param  {fromServices.LocalStorageService} privatelocalStorageService
   * @param  {fromServices.PushSubscriptionService} privatepushNotificationService
   * @param  {Store<fromPushSubStore.SubscriptionState>} privatepushSubscriptionStore
   * @param  {fromServices.LogUpdateService} publiclogUpdateService
   * @param  {fromServices.PromptUpdateService} publicpromptUpdateService
   * @param  {fromServices.CheckForUpdateService} publiccheckForUpdateService
   * @param  {MatSnackBar} publicsnackBar
   * @param  {Store<fromCart.State>} privatestore
   * @param  {ApplicationRef} privateapplicationRef
   */
  constructor(
    private router: Router,
    private injector: Injector,
    private titleService: Title,
    private media: ObservableMedia,
    @Inject(WINDOW) private window: Window,
    private logger: fromServices.LoggerService,
    private pageHeaderService: PageHeaderService,
    private routerStore: Store<fromRouterStore.RouterStateUrl>,
    private localStorageService: fromServices.LocalStorageService,
    private pushNotificationService: fromServices.PushSubscriptionService,
    private pushSubscriptionStore: Store<fromPushSubStore.SubscriptionState>,
    public logUpdateService: fromServices.LogUpdateService,
    public promptUpdateService: fromServices.PromptUpdateService,
    public checkForUpdateService: fromServices.CheckForUpdateService,
    public snackBar: MatSnackBar,
    private store: Store<fromCart.State>,
    private applicationRef: ApplicationRef
  ) {
    super();
    this.log('constructor()');
    this.media
      .asObservable()
      .pipe(takeUntil(this.d$))
      .subscribe((change: MediaChange) => {
        this.mqState = change
          ? `'${change.mqAlias}' = (${change.mediaQuery})`
          : '';
      });

    if (!this.localStorageService.storageAgreement) {
      const snackBarRef = this.snackBar.open(
        'We use your browser storage',
        'I AGREE',
        {
          verticalPosition: 'top',
        }
      );

      snackBarRef
        .afterDismissed()
        .pipe(takeUntil(this.d$))
        .subscribe(null, null, () => {
          this.localStorageService.storageAgreement = true;
        });
    }
  }

  /**
   * Initialize component.
   * @returns void
   */
  ngOnInit(): void {
    this.log('ngOnInit()');
    this.scrollToTop();
    this.getCartTotal();
    this.setPageTitle();
    this.selectIsPushAllowed();
    this.selectIsPushEnabled();
    this.selectIsPushSubscribed();
    this.dispatchPushSubscription();
    this.pushNotificationService.subscribeForPushNotifications();
    this.showDemoMessage = environment.production ? true : false;
    customElements.define(
      'static-page',
      createCustomElement(StaticPageComponent, {
        injector: this.injector,
      })
    );
  }

  /**
   * @returns void
   */
  private scrollToTop(): void {
    this.router.events
      .pipe(
        takeUntil(this.d$),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((_: NavigationEnd) => {
        const contentContainer =
          document.querySelector('.mat-sidenav-content') || this.window;
        contentContainer.scrollTo(0, 0);
      });
  }

  /**
   * @returns void
   */
  private getCartTotal(): void {
    this.applicationRef.isStable
      .pipe(takeUntil(this.d$))
      .subscribe((isStable: boolean) => {
        if (isStable) {
          this.cartTotal$ = this.store.pipe(select(fromCart.selectTotal));
        }
      });
  }

  /**
   * @returns boolean
   */
  get isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  /**
   * @returns void
   */
  subscribe(): void {
    this.log('subscribe()');
    this.pushNotificationService.subscribeForPushNotifications();
  }

  /**
   * @returns void
   */
  unsubscribe(): void {
    this.log('unsubscribe()');
    this.pushNotificationService.unsubscribeForPushNotifications();
  }

  /**
   * @returns void
   */
  private setPageTitle(): void {
    this.log('setPageTitle()');
    this.routerStore
      .pipe(
        takeUntil(this.d$),
        select(fromRouterStore.getRouterState)
      )
      .subscribe((routerState: {state: fromRouterStore.RouterStateUrl}) => {
        if (routerState && !!routerState.state.pageTitle) {
          this.pageHeaderService.title = routerState.state.pageTitle;
          this.titleService.setTitle(
            `${routerState.state.pageTitle} :: Dutch Cask`
          );
        } else {
          this.titleService.setTitle(environment.defaultPageTitle);
        }
      });
  }

  /**
   * @returns void
   */
  private selectIsPushAllowed(): void {
    this.log('selectIsPushAllowed()');
    this.isPushAllowed$ = this.pushSubscriptionStore.pipe(
      select(fromPushSubStore.selectIsPushAllowedState)
    );
  }

  /**
   * @returns void
   */
  private selectIsPushEnabled(): void {
    this.log('selectIsPushEnabled()');
    this.isPushEnabled$ = this.pushSubscriptionStore.pipe(
      select(fromPushSubStore.selectIsPushEnabledState)
    );
  }

  /**
   * @returns void
   */
  private selectIsPushSubscribed(): void {
    this.log('selectIsPushSubscribed()');
    this.isSubscribed$ = this.pushSubscriptionStore.pipe(
      select(fromPushSubStore.selectIsSubscribedState)
    );
  }

  /**
   * @returns void
   */
  private dispatchPushSubscription(): void {
    this.log('dispatchPushSubscription()');
    this.localStorageService.getPushSubscriptionId()
      ? this.pushSubscriptionStore.dispatch(new fromPushSubStore.IsSubscribed())
      : this.pushSubscriptionStore.dispatch(
          new fromPushSubStore.IsUnsubscribed()
        );
  }

  /**
   * @param  {string} message
   */
  private log(message: string): void {
    const timestamp = new Date().toISOString();
    this.logger.log(
      `[${timestamp}] - ${this.constructor.name}::${message}`,
      'background: #222; color: yellow'
    );
  }
}
