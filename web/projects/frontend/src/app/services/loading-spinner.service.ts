/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {ComponentPortal, DomPortalHost} from '@angular/cdk/portal';
import {DOCUMENT} from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
} from '@angular/core';
import {LoadingSpinnerComponent} from '../components/shared/loading-spinner.component';
import {SharedModule} from '../modules/shared.module';

@Injectable({
  providedIn: SharedModule,
})
export class LoadingSpinnerService {
  /**
   * Reference to our Portal.
   * This is the portal we'll use to attach our LoadingSpinnerComponent.
   * @type {ComponentPortal<LoadingSpinnerComponent>}
   */
  private loadingSpinnerPortal: ComponentPortal<LoadingSpinnerComponent>;

  /**
   * Reference to our Portal Host.
   * We use DOMPortalHost as we'll be using document.body as our anchor.
   * @type {DomPortalHost}
   */
  private bodyPortalHost: DomPortalHost;

  /**
   * Default constructor.
   * Inject the dependencies needed by the DOMPortalHost constructor.
   * @param  {Injector} privateinjector
   * @param  {ApplicationRef} privateappRef
   * @param  {} @Inject(DOCUMENT
   * @param  {any} privatedocument
   * @param  {ComponentFactoryResolver} privatecomponentFactoryResolver
   */
  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private document: any,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    // Create a Portal based on the LoadingSpinnerComponent
    this.loadingSpinnerPortal = new ComponentPortal(LoadingSpinnerComponent);
    // Create a PortalHost with _document.body as its anchor element
    this.bodyPortalHost = new DomPortalHost(
      this.document.body,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
  }

  /**
   * Attach the Portal to the PortalHost.
   * @returns void
   */
  reveal(): void {
    setTimeout(_ => {
      this.bodyPortalHost.attach(this.loadingSpinnerPortal);
    });
  }

  /**
   * Detach the Portal from the PortalHost.
   * @returns void
   */
  conceal(): void {
    setTimeout(_ => {
      this.bodyPortalHost.detach();
    });
  }
}
