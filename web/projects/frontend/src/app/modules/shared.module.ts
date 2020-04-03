/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ArticleCarouselDirective} from '../directives/article-carousel.directive';
import {MaterialModule} from './material.module';

@NgModule({
  imports: [CommonModule, MaterialModule, HttpClientModule, FlexLayoutModule],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ArticleCarouselDirective,
  ],
  declarations: [ArticleCarouselDirective],
})
export class SharedModule {}
