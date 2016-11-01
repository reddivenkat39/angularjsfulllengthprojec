import { TabnerPage } from './app.po';

describe('tabner App', function() {
  let page: TabnerPage;

  beforeEach(() => {
    page = new TabnerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
