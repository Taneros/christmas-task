import Component from '../../templates/component';

//TODO
/**
 *
 *
 * Ask Alexey how to store and get access to templates
 *
 *
 **/

class Footer extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderFooterElements() {
    const footerElements = document.createElement('div');
    footerElements.className = 'footer__content';
    footerElements.innerHTML = `
      <div class="footer__item">
        <a href="https://github.com/taneros" target="_blank">
          <img class="footer__item__icon-git" src="./assets/github.svg" alt="Taneros' GitHub">
        </a>
      </div>
      <div class="footer__item">
        <p class="footer__item__date">© 2021</p>
      </div>
      <div class="footer__item">
        <a href="https://rs.school/js/" title="Link to the course" target="_blank">
          <img class="footer__item__icon-rss" src="./assets/rs_school_js_grey.svg" alt="RS School">
        </a>
      </div>
    `;
    this.container.append(footerElements);
  }

  render() {
    this.renderFooterElements();
    return this.container;
  }
}

export default Footer;
