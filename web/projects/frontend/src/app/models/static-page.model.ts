/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

export interface StaticPage {
  status: string;
  count: 1;
  data: [
    {
      type: string;
      static_page_id: string;
      attributes: {
        title: string;
        slug: string;
        sub_title: string;
        body: string;
        timestamps: {
          created_at: string;
          updated_at: string;
        };
      };
      request: {
        method: string;
        link: string;
      };
    }
  ];
  links: {
    self: string;
  };
}
