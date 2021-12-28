import Footer from '../core/components/footer';
import Header from '../core/components/header';
import Main from '../core/components/main';
import Page from '../core/templates/page';
import GamePage from '../pages/game';
import MainPage from '../pages/main';
import SettingsPage from '../pages/settings';
import { Settings, localStorageNames } from './settings';
import Utils from './utils';

//TODO
/**
 *
 * rename classes all caps
 * rename vars camel case
 * remove header on main page
 *
 * check types of methods funtions returns
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
  private pageHash: string | boolean;

  constructor() {
    this.main = new Main('main', 'main');
    this.header = new Header('header', 'header');
    this.footer = new Footer('footer', 'footer');
    this.pageHash =
      Settings.getLocalStorageControls(localStorageNames.hash) || 'main';
  }

  private renderNewPage(idPage: string) {
    console.log(`renderNewPage() >> `, idPage);
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
    Settings.setLocalStorageControls(localStorageNames.hash, idPage);
  }

  // Router
  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      console.log(`nohash ext hash incoming`, hash);
      this.pageHash = hash;
      this.renderNewPage(hash);
    });

    // if (!this.pageHash) {
    //   window.addEventListener('hashchange', () => {
    //     const hash = window.location.hash.slice(1);
    //     console.log(`nohash ext hash incoming`, hash);
    //     this.renderNewPage(hash);
    //   });
    // } else {
    //   console.log(`else some hash`);
    // }
  }

  run() {
    App.container.append(this.header.render());
    App.container.append(this.main.render());
    this.renderNewPage(`${this.pageHash}`);
    App.container.append(this.footer.render());
    this.enableRouteChange();
    // this.enableRouteChange('game');
    // this.enableRouteChange('settings');
  }
}

export default App;
