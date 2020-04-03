import {AppPage} from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display DUTCH CASK main button', () => {
    page.navigateTo();
    expect(page.getMainButtonText()).toEqual('DUTCH CASK');
  });

  it('should display Home title', () => {
    page.navigateTo();
    expect(page.getHomeTitle()).toEqual('Home');
  });
});
