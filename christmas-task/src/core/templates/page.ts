//TODO
/**
 *
 * Create Main Page with tag amin
 *
 * Add class parameter to constructor
 *
 *
 **/

abstract class Page {
  protected container: HTMLElement;
  static TextObject = {};

  constructor(id: string, className: string = '') {
    this.container = document.createElement('div');
    this.container.id = id;
    this.container.className = className;
  }

  protected createHeaderTitle(text: string) {
    const headerTitle = document.createElement('h1');
    headerTitle.innerText = text;
    return headerTitle;
  }

  render() {
    return this.container;
  }
}

export default Page;
