import {Component} from '@angular/core';
import {LoggerService} from '../../services/logger.service';
import {PageHeaderService} from '../../services/page-header.service';

const SMALL_WIDTH_BREAKPOINT = 479;

@Component({
  selector: 'dcwa-page-header',
  template: `
    <mat-toolbar><span class="title" [class.title__handheld]="isScreenSmall">{{ pageHeaderService.title }}</span></mat-toolbar>
  `,
  styles: [
    `
      .title {
        font-weight: 400;
      }
      .title__handheld {
        margin: 0 auto;
      }
    `,
  ],
})
export class PageHeaderComponent {
  private mediaMatcher: MediaQueryList = matchMedia(
    `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
  );

  /**
   * Default constructor.
   */
  constructor(
    private logger: LoggerService,
    public pageHeaderService: PageHeaderService
  ) {
    this.log('constructor()');
  }

  /**
   * @returns boolean
   */
  get isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
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
