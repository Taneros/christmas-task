import Page from '../../core/templates/page';

class GamePage extends Page {
  static TextObject = {
    MainTitle: 'Play Game',
  };

  constructor(id: string, className: string) {
    super(id, className);
  }

  render() {
    const title = this.createHeaderTitle(GamePage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default GamePage;
