import Footer from '../../core/components/footer';
import Header from '../../core/components/header';
import Main from '../../core/components/main';
import Page from '../../core/templates/page';
import GamePage from '../game';
import MainPage from '../main';
import SettingsPage from '../settings';

export const enum PageIds {
  MainPage = 'main',
  SettingsPage = 'settings',
  GamePage = 'game',
}

export const enum PageClasses {
  MainPageClass = 'main__main',
  SettingsPageClass = 'main__settings',
  GamePageClass = 'main__game',
}

class App {
  private static container: HTMLElement = document.querySelector('.app')!;
  private main: Main;
  private header: Header;
  private footer: Footer;
  // private static defaultPageId: string = 'current-page';

  static renderNewPage(idPage: string) {
    const mainHTML: HTMLElement = document.querySelector('.main')!;
    mainHTML.innerHTML = '';
    let page: Page | null = null;

    if (idPage === PageIds.MainPage)
      page = new MainPage(idPage, PageClasses.MainPageClass);
    else if (idPage === PageIds.SettingsPage)
      page = new SettingsPage(idPage, PageClasses.SettingsPageClass);
    else if (idPage === PageIds.GamePage)
      page = new GamePage(idPage, PageClasses.GamePageClass);

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = idPage;
      mainHTML.append(pageHTML);
    }
  }

  // Router
  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  constructor() {
    this.main = new Main('main', 'main');
    this.header = new Header('header', 'header');
    this.footer = new Footer('footer', 'footer');
  }

  run() {
    App.container.append(this.header.render());
    App.container.append(this.main.render());
    App.renderNewPage('main');
    App.container.append(this.footer.render());
    this.enableRouteChange();
  }
}

export default App;
