import Footer from '../core/components/footer';
import Header from '../core/components/header';
import Main from '../core/components/main';
import Page from '../core/templates/page';
import GamePage from '../pages/game';
import MainPage from '../pages/main';
import SettingsPage from '../pages/settings';

//TODO
/**
 *
 * rename classes all caps
 * rename vars camel case
 * remove header on main page
 *
 **/

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

export const enum SectionClasses {
  Settings,
}

class App {
  private static container: HTMLElement = document.querySelector('.app')!;
  private main: Main;
  private header: Header;
  private footer: Footer;

  private renderNewPage(idPage: string) {
    const mainHTML: HTMLElement = document.querySelector('.main')!;
    mainHTML.innerHTML = '';
    let page: Page | null = null;

    if (idPage === PageIds.MainPage) {
      page = new MainPage(idPage, PageClasses.MainPageClass);
    } else if (idPage === PageIds.SettingsPage) {
      page = new SettingsPage(idPage, PageClasses.SettingsPageClass);
    } else if (idPage === PageIds.GamePage) {
      page = new GamePage(idPage, PageClasses.GamePageClass);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = idPage;
      mainHTML.append(pageHTML);
    }
  }

  // Router
  private enableRouteChange(hash: string = '') {
    if (!hash) {
      window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1);
        this.renderNewPage(hash);
      });
    } else {
      window.location.hash = hash;
      this.renderNewPage(hash);
    }
  }

  constructor() {
    this.main = new Main('main', 'main');
    this.header = new Header('header', 'header');
    this.footer = new Footer('footer', 'footer');
  }

  run() {
    App.container.append(this.header.render());
    App.container.append(this.main.render());
    this.renderNewPage('main');
    App.container.append(this.footer.render());
    this.enableRouteChange('');
  }
}

export default App;
