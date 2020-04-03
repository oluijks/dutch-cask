import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getMainButtonText() {
    return element(by.css('dcwa-root .mat-button')).getText();
  }

  getHomeTitle() {
    return element(by.css('dcwa-root .title')).getText();
  }
}
