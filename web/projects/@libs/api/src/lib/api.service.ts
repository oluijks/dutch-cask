/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {throwError} from 'rxjs/internal/observable/throwError';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _endPoint: string;

  constructor(private httpClient: HttpClient) {}

  set endPoint(url: string) {
    this._endPoint = url;
  }

  get endPoint(): string {
    return this._endPoint;
  }

  get articles(): Observable<any[]> {
    return this.getArticles();
  }

  private getArticles(): Observable<any[]> {
    return this.httpClient.get<any>(this._endPoint).pipe(this.handleError());
  }

  getStaticPage(slug: string) {
    return this.httpClient
      .get<any>(`${this._endPoint}/${slug}`)
      .pipe(this.handleError());
  }

  private handleError(): (source: Observable<any>) => Observable<any> {
    return catchError((error: HttpErrorResponse) => throwError(error));
  }
}
