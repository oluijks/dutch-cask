/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CategoryMenuItem} from '../../../../models/category-menu-item.model';

@Component({
  selector: 'dcwa-category-menu',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  navItems: CategoryMenuItem[] = [
    {
      displayName: 'CATEGORIES',
      iconName: 'close',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'michael-prentice',
              children: [
                {
                  displayName: 'Delight your Organization',
                  iconName: 'star_rate',
                  route: 'material-design',
                  children: [
                    {
                      displayName: 'Delight your Organization',
                      iconName: 'star_rate',
                      route: 'material-design',
                    },
                  ],
                },
              ],
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'stephen-fluin',
              children: [
                {
                  displayName: "What's up with the Web?",
                  iconName: 'star_rate',
                  route: 'what-up-web',
                },
              ],
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'my-ally-cli',
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'become-angular-tailer',
                },
              ],
            },
          ],
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Delight your Organization',
              iconName: 'star_rate',
              route: 'material-design',
            },
            {
              displayName: "What's up with the Web?",
              iconName: 'star_rate',
              route: 'what-up-web',
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'my-ally-cli',
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'become-angular-tailer',
            },
          ],
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'feedback',
        },
      ],
    },
  ];
}
