/**
 * @license
 * Copyright Dutch Cask. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://dutch-cask.nl/license
 */

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LoggerService} from '../../services/logger.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  image: string;
}

@Component({
  selector: 'dcwa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  tiles: Tile[] = [
    {
      text: '1-2-3',
      cols: 3,
      rows: 1,
      color: 'lightgrey',
      image: 'https://cdn.dutch-cask.nl:3000/images/home-page/cover-01.jpeg',
    },
    {
      text: '4-7',
      cols: 1,
      rows: 2,
      color: 'lightgrey',
      image: 'https://cdn.dutch-cask.nl:3000/images/home-page/cover-02.jpeg',
    },
    {
      text: '5-6',
      cols: 2,
      rows: 1,
      color: 'lightgrey',
      image: 'https://cdn.dutch-cask.nl:3000/images/home-page/cover-03.jpeg',
    },
    {
      text: '8',
      cols: 1,
      rows: 1,
      color: 'lightgrey',
      image: 'https://cdn.dutch-cask.nl:3000/images/home-page/cover-04.jpeg',
    },
    {
      text: '9',
      cols: 1,
      rows: 1,
      color: 'lightgrey',
      image: 'https://cdn.dutch-cask.nl:3000/images/home-page/cover-05.jpeg',
    },
  ];

  constructor(private logger: LoggerService) {
    this.log('constructor()');
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
