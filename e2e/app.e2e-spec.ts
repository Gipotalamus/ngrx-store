import { NgrxStrorePage } from './app.po';

describe('ngrx-strore App', () => {
  let page: NgrxStrorePage;

  beforeEach(() => {
    page = new NgrxStrorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
