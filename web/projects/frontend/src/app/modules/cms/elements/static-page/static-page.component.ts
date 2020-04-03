/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {SafeHtml, Title} from '@angular/platform-browser';
import {ApiService} from '@dc/api';
import {MarkdownService, MarkedOptions} from 'ngx-markdown';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {takeUntil} from 'rxjs/internal/operators/takeUntil';
import {environment} from '../../../../../environments/environment';
import {UnsubscribeOnDestroy} from '../../../../classes/unsubscribe-on-destroy';
import {StaticPage} from '../../../../models/static-page.model';
import {LoggerService} from '../../../../services/logger.service';
import {PageHeaderService} from '../../../../services/page-header.service';

@Component({
  template: `
    <div *ngIf="(content$ | async)" [innerHtml]="(content$ | async)"></div>
    <dcwa-not-found *ngIf="(pageNotFound$ | async)"></dcwa-not-found>
  `,
  providers: [MarkdownService, MarkedOptions],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaticPageComponent extends UnsubscribeOnDestroy
  implements OnInit {
  content$ = new BehaviorSubject<SafeHtml>('');
  pageNotFound$ = new BehaviorSubject<boolean>(false);
  private _data$ = new BehaviorSubject<string>('');

  @Input()
  set data(value) {
    this._data$.next(value);
  }

  private readonly apiUrl: string = `${environment.api.baseUrl}${
    environment.api.resources.staticPages
  }/slug`;

  /**
   * Default constructor.
   * @param  {Title} privatetitleService
   * @param  {LoggerService} privatelogger
   * @param  {ApiService} privateapiService
   * @param  {MarkdownService} privatemarkdownService
   */
  constructor(
    private titleService: Title,
    private logger: LoggerService,
    private apiService: ApiService,
    private markdownService: MarkdownService,
    private pageHeaderService: PageHeaderService
  ) {
    super();
    this.log('constructor()');
    this.apiService.endPoint = this.apiUrl;
  }

  /**
   * @returns string
   */
  get data(): string {
    this.log('data()');
    return this._data$.getValue();
  }

  /**
   * @returns void
   */
  ngOnInit(): void {
    this.log('ngOnInit()');
    this._data$.pipe(takeUntil(this.d$)).subscribe(_ => {
      if (this.data) {
        this.apiService
          .getStaticPage(this.data)
          .pipe(takeUntil(this.d$))
          .subscribe(
            (content: StaticPage) => {
              if (content) {
                this.titleService.setTitle(
                  `${content.data[0].attributes.title} :: Dutch Cask`
                );
                this.pageHeaderService.title = content.data[0].attributes.title;
                const marked = this.markdownService.compile(
                  content.data[0].attributes.body
                );
                this.content$.next(marked);
              }
            },
            (error: any) => {
              // @todo show some meaninful error message
              this.pageNotFound$.next(true);
              // @todo do something meaningful with the error?
              console.error(error);
            }
          );
      }
    });
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
