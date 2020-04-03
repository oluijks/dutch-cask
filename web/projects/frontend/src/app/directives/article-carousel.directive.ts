/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {ArticleCarouselContext} from '../modules/catalog/product/models/article-carousel-context';

@Directive({
  selector: '[dcwaArticleCarousel]',
})
export class ArticleCarouselDirective implements OnInit {
  @Input() dcwaArticleCarouselFrom: string[];

  /**
   * {@type} number
   */
  carouselIndex: number = 0;

  /**
   * {@type} ArticleCarouselContext | null
   */
  context: ArticleCarouselContext | null = null;

  /**
   * Default constructor.
   * @param  {ViewContainerRef} private_viewContainerRef
   * @param  {TemplateRef<ProductCarouselContext>} private_templateRef
   */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<ArticleCarouselContext>
  ) {}

  /**
   * @returns void
   */
  ngOnInit(): void {
    this.context = {
      $implicit: this.dcwaArticleCarouselFrom[0],
      controls: {
        next: () => this.next(),
        prev: () => this.prev(),
        index: () => this.index(),
      },
    };
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
  }

  /**
   * @returns void
   */
  next(): void {
    this.carouselIndex++;
    if (this.carouselIndex >= this.dcwaArticleCarouselFrom.length) {
      this.carouselIndex = 0;
    }
    this.context!.$implicit = this.dcwaArticleCarouselFrom[this.carouselIndex];
  }

  /**
   * @returns void
   */
  prev(): void {
    this.carouselIndex--;
    if (this.carouselIndex < 0) {
      this.carouselIndex = this.dcwaArticleCarouselFrom.length - 1;
    }
    this.context!.$implicit = this.dcwaArticleCarouselFrom[this.carouselIndex];
  }

  /**
   * @returns number
   */
  index(): number {
    return this.carouselIndex + 1;
  }
}
