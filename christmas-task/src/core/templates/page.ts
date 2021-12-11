//TODO
/**
 *
 *
 **/

//abstract class can be extended but not used to create an instance of

abstract class Page {
  protected container: HTMLElement;

  constructor(id: string, className: string = '') {
    this.container = document.createElement('div');
    this.container.id = id;
    this.container.className = className;
  }

  // protected available thorugh the instance of class

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
