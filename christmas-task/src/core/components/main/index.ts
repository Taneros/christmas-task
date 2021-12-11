import Component from '../../templates/components';

class Main extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }
  render() {
    return this.container;
  }
}

export default Main;
