import Page from '../../core/templates/page';

class SettingsPage extends Page {
  static TextObject = {
    MainTitle: 'Settings Page',
  };
  constructor(id: string, className: string) {
    super(id, className);
  }

  render() {
    const title = this.createHeaderTitle(SettingsPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default SettingsPage;
