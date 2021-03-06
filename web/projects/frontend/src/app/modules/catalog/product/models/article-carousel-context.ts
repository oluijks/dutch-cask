/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

export interface ArticleCarouselContext {
  $implicit: string;
  controls: {
    next: () => void;
    prev: () => void;
    index: () => number;
  };
}
