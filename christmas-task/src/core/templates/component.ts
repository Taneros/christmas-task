class Component {
  protected container: HTMLElement;

  constructor(tagName: string, className: string, id?: string) {
    this.container = document.createElement(tagName);
    this.container.className = className;
    id ? (this.container.id = id) : null;
  }

  render() {
    return this.container;
  }
}

export default Component;
