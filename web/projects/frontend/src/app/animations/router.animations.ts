/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter, :leave', style({position: 'fixed', opacity: 1})),
    group([
      query(':enter', [
        style({opacity: 0}),
        animate('1000ms ease-in-out', style({opacity: 1})),
      ]),
      query(':leave', [
        style({opacity: 1}),
        animate('1000ms ease-in-out', style({opacity: 0})),
      ]),
    ]),
  ]),
]);
