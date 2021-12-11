import Main from '../../core/components/main';
import Page from '../../core/templates/page';

class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Main Page',
  };

  constructor(id: string, className: string) {
    super(id, className);
  }

  render() {
    return this.container;
  }
}

export default MainPage;
