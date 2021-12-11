import Main from '../../core/components/main';
import Page from '../../core/templates/page';

class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Main Page',
  };

  mainHTML: Main;

  constructor(id: string, className: string) {
    super(id, className);
    this.mainHTML = new Main('main', 'main');
  }

  render() {
    // const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    // this.container.append(title);
    const mainHTMLrenderred: HTMLElement = this.mainHTML.render();
    mainHTMLrenderred.append(this.container);
    return mainHTMLrenderred;
  }
}

export default MainPage;
