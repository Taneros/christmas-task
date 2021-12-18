import { PageIds } from '../../../app';
import Basket from '../../templates/basket';
import Component from '../../templates/component';
import SearchInput from '../../templates/search-input';

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
  private searchBox: Component;
  private basket: Component;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.className = className;
    this.searchBox = new Component(
      'div',
      'header__search search-container',
      'search-box'
    );
    this.basket = new Component('div', 'header__basket basket', 'basket');
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

  renderSearchBox() {
    // header Search Box
    // const header = document.querySelector('.header') as HTMLElement;
    const searchDiv: HTMLElement = this.searchBox.render();
    searchDiv.innerHTML = SearchInput.searchForm;
    this.container.append(searchDiv);
  }

  renderBasket() {
    const basketDiv: HTMLElement = this.basket.render();
    basketDiv.innerHTML = Basket.basket;
    this.container.append(basketDiv);
  }

  render() {
    this.renderNavButtons();
    this.renderSearchBox();
    this.renderBasket();
    return this.container;
  }
}

export default Header;
