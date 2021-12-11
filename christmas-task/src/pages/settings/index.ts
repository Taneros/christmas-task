import Component from '../../core/templates/component';
import Page from '../../core/templates/page';
import SettingsSections from '../../core/templates/settings';

class SettingsPage extends Page {
  controlSection: Component;
  cardsSection: Component;

  constructor(id: string, className: string) {
    super(id, className);
    this.controlSection = new Component('section', 'controls');
    this.cardsSection = new Component('section', 'cards');
  }

  render() {
    const controlSection: HTMLElement = this.controlSection.render();
    controlSection.innerHTML = SettingsSections.controls;
    this.container.append(controlSection);
    const cardsSection: HTMLElement = this.cardsSection.render();
    cardsSection.innerHTML = SettingsSections.cards;
    this.container.append(cardsSection);
    return this.container;
  }
}

export default SettingsPage;
