import {Platform} from '@angular/cdk/platform';
import {CommonModule} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, inject, TestBed} from '@angular/core/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatchMedia,
  MockMatchMedia,
  MockMatchMediaProvider,
  SERVER_TOKEN,
  StyleUtils,
} from '@angular/flex-layout/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {ServiceWorkerModule} from '@angular/service-worker';
import {ApiService} from '@dc/api';
import {StoreModule} from '@ngrx/store';
import {AppComponent} from './app.component';
import {CategoryMenuItemComponent, DemoMessageComponent} from './components';
import {FooterComponent} from './components/shared/footer/footer.component';
import {CategoryComponent} from './components/shared/menus/category/category.component';
import {PageHeaderComponent} from './components/shared/page-header.component';
import {CheckoutButtonComponent} from './modules/checkout/components/shared/checkout-button/checkout-button.component';
import {MaterialModule} from './modules/material.module';
import {CheckForUpdateService} from './services/service-worker/check-for-update.service';
import {LogUpdateService} from './services/service-worker/log-update.service';
import {PromptUpdateService} from './services/service-worker/prompt-update.service';
import {PushSubscriptionService} from './services/service-worker/push-subscription.service';
import {WINDOW_PROVIDERS} from './services/window.service';
import * as fromRouterStore from './store/router';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        StoreModule.forRoot(fromRouterStore.reducers, {}),
        ServiceWorkerModule.register('', {enabled: false}),
      ],
      declarations: [
        AppComponent,
        FooterComponent,
        CategoryComponent,
        PageHeaderComponent,
        DemoMessageComponent,
        CheckoutButtonComponent,
        CategoryMenuItemComponent,
      ],
      providers: [
        ApiService,
        LogUpdateService,
        PromptUpdateService,
        CheckForUpdateService,
        PushSubscriptionService,
        MockMatchMediaProvider,
        {provide: SERVER_TOKEN, useValue: true},
        WINDOW_PROVIDERS,
      ],
    }).compileComponents();
  }));

  it('should create the app component', async(() => {
    let matchMedia: MockMatchMedia;
    let platform: Platform;
    let styler: StyleUtils;

    inject(
      [MatchMedia, Platform, StyleUtils],
      (
        _matchMedia: MockMatchMedia,
        _platform: Platform,
        _styler: StyleUtils
      ) => {
        matchMedia = _matchMedia;
        platform = _platform;
        styler = _styler;
      }
    )();

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    // matchMedia.activate('md');
    expect(app).toBeTruthy();
  }));

  it(`should have as appTitle 'DUTCH CASK'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.appTitle).toEqual('DUTCH CASK');
  }));
});
