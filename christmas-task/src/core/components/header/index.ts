import { PageIds } from '../../../pages/app';
import Component from '../../templates/components';

const Buttons = [
  {
    id: PageIds.MainPage,
    text: 'Main Page',
  },
  {
    id: PageIds.SettingsPage,
    text: 'Choose Toys',
  },
  {
    id: PageIds.GamePage,
    text: 'Decorate Tree',
  },
];

class Header extends Component {
  private className: string;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.className = className;
  }

  renderNavButtons() {
    const navButtons = document.createElement('nav');
    navButtons.className = `${this.className}__nav`;
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.className = `${this.className}__nav__btn`;
      buttonHTML.innerText = button.text;
      navButtons.append(buttonHTML);
    });
    this.container.append(navButtons);
  }

  render() {
    this.renderNavButtons();
    return this.container;
  }
}

export default Header;
