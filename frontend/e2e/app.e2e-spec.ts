import { PersonalLibraryPage } from './app.po';

describe('personal-library App', () => {
  let page: PersonalLibraryPage;

  beforeEach(() => {
    page = new PersonalLibraryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
