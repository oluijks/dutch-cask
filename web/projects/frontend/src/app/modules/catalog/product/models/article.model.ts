/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {TimeStamps} from '../../../../models/timestamps.model';

export interface Article {
  status: string;
  count: number;
  products: ArticleData[];
  links: ArticleLinks;
}

export interface ArticleData {
  type: string;
  product_id: string;
  catalog_id: string;
  attributes: ArticleDataAttributes;
  request: ArticleDataRequest;
}

export interface ArticleDataAttributes {
  name: string;
  slug: string;
  description: {
    short: string;
    long: string;
  };
  prices: {
    price: number;
    currency_code: string;
  };
  photos: {
    main: string;
    additional: string[];
  };
  timestamps: TimeStamps;
}

export interface ArticleDataRequest {
  method: string;
  link: string;
}

export interface ArticleLinks {
  self: string;
}
