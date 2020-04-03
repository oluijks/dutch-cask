import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {LoggerService} from '../../../services/logger.service';

@Component({
  selector: 'dcwa-footer',
  template: `
  <footer fxLayout="column" fxLayout.gt-sm="row" fxLayoutAlign="space-around center" class="mat-caption">
    <div fxLayout="column" fxLayoutAlign="center center">
      <span id="angVersion">Angular Version: {{ angularVersion }}</span>
      <span id="appVersion">Dutch Cask Version: {{ applicationVersion }}</span>
    </div>
    <div fxLayout="column" fxLayoutAlign="center center">
      <span id="poweredBy">Powered by Dutch Cask &copy;2018</span>
      <span id="licensedUnder">Code licensed under an <a routerLink="/license">MIT-style License</a></span>
    </div>
  </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() angularVersion: string;
  @Input() applicationVersion: string;

  /**
   * Default constructor.
   */
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
