import Component from '../../core/templates/component';
import Page from '../../core/templates/page';
import SettingsSections from '../../core/templates/settings';

class SettingsPage extends Page {
  private controlSection: Component;
  private cardsSection: Component;

  constructor(id: string, className: string) {
    super(id, className);
    this.controlSection = new Component('section', 'controls');
    this.cardsSection = new Component('section', 'cards');
  }

  createContent(): void {
    const controlSection: HTMLElement = this.controlSection.render();
    controlSection.innerHTML = SettingsSections.controls;
    this.container.append(controlSection);
    const cardsSection: HTMLElement = this.cardsSection.render();
    cardsSection.innerHTML = SettingsSections.cards;
    this.container.append(cardsSection);
    this.bindListeners();
  }

  bindListeners(): void {
    console.log('bind linsteres');
    const buttons: HTMLElement | null =
      this.container.querySelector('.filter__btns');
    console.log('buttons', buttons);
    buttons?.addEventListener('click', (e) => {
      const button = e.target as HTMLElement;
      console.log('button event:', button.dataset);
    });
  }

  render() {
    this.createContent();
    return this.container;
  }
}

export default SettingsPage;
