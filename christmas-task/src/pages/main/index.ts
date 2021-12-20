import Main from '../../core/components/main';
import Component from '../../core/templates/component';
import MainPageSections from '../../core/templates/main-page';
import Page from '../../core/templates/page';

class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Main Page',
  };

  constructor(id: string, className: string) {
    super(id, className);
  }

  private pageContents(): void {
    const mainDivWelcomeComp: HTMLElement = new Component(
      'div',
      'main__welcome'
    ).render();
    mainDivWelcomeComp.innerHTML = MainPageSections.welcomeContent;
    this.container.append(mainDivWelcomeComp);
    const anchorWelcomeComp: HTMLElement = new Component('a', '').render();
    anchorWelcomeComp.setAttribute('href', '#settings');
    anchorWelcomeComp.innerHTML = MainPageSections.startBtn;
    this.container.append(anchorWelcomeComp);
  }

  render() {
    this.pageContents();
    return this.container;
  }
}

export default MainPage;
