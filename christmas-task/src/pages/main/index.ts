import Component from '../../core/templates/components';
import Page from '../../core/templates/page';

class Main extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }
  render() {
    return this.container;
  }
}

const mainHTML = new Main('main', 'main');
const mainHTMLrenderred: HTMLElement = mainHTML.render();

class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Main Page',
  };

  constructor(id: string, className: string) {
    super(id, className);
  }

  render() {
    const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    this.container.append(title);
    mainHTMLrenderred.append(this.container);
    return mainHTMLrenderred;
  }
}

export default MainPage;
