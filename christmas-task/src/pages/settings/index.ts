import { data } from '../../assets/data';
import Component from '../../core/templates/component';
import Page from '../../core/templates/page';
import SettingsSections from '../../core/templates/settings';

interface IData {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

// interface IData {
//   [key: string]: string | boolean;
// }

interface filter {
  count: {};
  year: {};
  shape: { [key: string]: boolean };
  color: {};
  size: {};
  favorite: boolean;
}

export interface IObj {
  [key: string]: { [key: string]: boolean | number } | boolean;
}

// export interface testPropObj {
//   [key2: string]: boolean | number;
// }

// export interface testMainObj {
//   [key1: string]: testPropObj | boolean;
// }

class SettingsPage extends Page {
  private controlSection: Component;
  private cardsSection: Component;

  constructor(id: string, className: string) {
    super(id, className);
    this.controlSection = new Component('section', 'controls');
    this.cardsSection = new Component('section', 'cards');
  }

  createContentControls(): void {
    const controlSection: HTMLElement = this.controlSection.render();
    controlSection.innerHTML = SettingsSections.controls;
    this.container.append(controlSection);
    const cardsSection: HTMLElement = this.cardsSection.render();
    cardsSection.innerHTML = SettingsSections.cards;
    this.container.append(cardsSection);
    this.bindListeners();
  }

  translateProp(prop: string, lang: string): string {
    let translation: string = '';

    if (lang === 'en') {
      switch (prop) {
        case 'шар':
          translation = 'ball';
          break;
        case 'колокольчик':
          translation = 'bell';
          break;
        case 'шишка':
          translation = 'pinecone';
          break;
        case 'снежинка':
          translation = 'snowflake';
          break;
        case 'фигурка':
          translation = 'figurine';
          break;
      }
    } else {
      switch (prop) {
        case 'ball':
          translation = 'шар';
          break;
        case 'bell':
          translation = 'колокольчик';
          break;
        case 'pinecone':
          translation = 'шишка';
          break;
        case 'snowflake':
          translation = 'снежинка';
          break;
        case 'figurine':
          translation = 'фигурка';
          break;
      }
    }
    return translation;
  }

  bindListeners(): void {
    const buttonBlocks = this.container.querySelectorAll('.filter__btns');
    const filter: IObj = {
      count: { start: 1, end: 12 },
      year: { start: 1940, end: 2020 },
      shape: {
        ball: false,
        bell: false,
        pinecone: false,
        snowflake: false,
        figurine: false,
      },
      color: {},
      size: {},
      favorite: false,
    };

    buttonBlocks.forEach((btnBlock) => {
      btnBlock?.addEventListener('click', (e) => {
        const buttonDiv = e.currentTarget as HTMLElement;
        const button = e.target as HTMLElement;
        const dataFilterVal: string | undefined = button.dataset.filter;

        if (dataFilterVal) {
          const btnDiv: string = buttonDiv.id.split('-').slice(-1)[0];
          const btnData: string = this.translateProp(dataFilterVal, 'en');
          const levelOne = filter[btnDiv];
          typeof levelOne === 'object'
            ? levelOne[btnData] === false
              ? (levelOne[btnData] = true)
              : (levelOne[btnData] = false)
            : null;
          this.fileterData(filter);
        }
      });
    });
  }

  fileterData(filter: IObj): Array<IData> {
    const shape = typeof filter.shape === 'object' ? filter.shape : {};

    console.log('shape', shape);
    const filteredData: Array<IData> = [];

    const dataImport: Array<IData> = data;

    dataImport.forEach((el) => {
      for (let key in shape) {
        // console.log('key', key);
        // console.log('shape[key] === true', shape[key] === true, key);
        // console.log(`el['shape'] === key`, el['shape']);
        if (
          shape[key] === true &&
          el['shape'] === this.translateProp(key, 'ru')
        ) {
          console.log('match!');
          filteredData.push(el);
        }
      }
    });
    console.log(filteredData);

    return filteredData;
  }

  render() {
    this.createContentControls();
    return this.container;
  }
}

export default SettingsPage;
