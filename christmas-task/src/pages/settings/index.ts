import { Slider } from '../../app/slider';
import { data } from '../../assets/data';
import Component from '../../core/templates/component';
import Page from '../../core/templates/page';
import SettingsSections from '../../core/templates/settings';

//TODO
/**
 * use const for getting classnames in case of chahnge ex: .slider__thumb
 * Translate data to eng
 *
 **/

interface IData {
  [key: string]: string | boolean;
}

interface IDataExact extends IData {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

interface IObj {
  [key: string]: { [key: string]: boolean | number } | boolean;
}

class SettingsPage extends Page {
  private controlSection: Component;
  private cardsSection: Component;

  private static filter: IObj = {
    count: { start: 1, end: 12 },
    year: { start: 1940, end: 2020 },
    shape: {
      ball: false,
      bell: false,
      pinecone: false,
      snowflake: false,
      figurine: false,
    },
    color: {
      white: false,
      yellow: false,
      red: false,
      blue: false,
      green: false,
    },
    size: {
      big: false,
      medium: false,
      small: false,
    },
    favorite: false,
    isChanged: false,
  };

  private static rusLabel = [
    'шар',
    'колокольчик',
    'шишка',
    'снежинка',
    'фигурка',
    'белый',
    'желтый',
    'красный',
    'синий',
    'зелёный',
    'большой',
    'средний',
    'малый',
  ];

  private static engLabel = [
    'ball',
    'bell',
    'pinecone',
    'snowflake',
    'figurine',
    'white',
    'yellow',
    'red',
    'blue',
    'green',
    'big',
    'medium',
    'small',
  ];

  constructor(id: string, className: string) {
    super(id, className);
    this.controlSection = new Component('section', 'controls');
    this.cardsSection = new Component('section', 'cards');
  }

  private createContentControls() {
    const controlSection: HTMLElement = this.controlSection.render();
    controlSection.innerHTML = SettingsSections.controls;
    // slider  1 - 12
    const sliderThumbs: NodeList =
      controlSection.querySelectorAll('.slider__thumb');

    const sliderThumbElementList: Array<HTMLElement> = [];

    if (sliderThumbs) {
      for (let node of sliderThumbs) {
        if (node.nodeType == Node.ELEMENT_NODE) {
          sliderThumbElementList.push(node as HTMLElement);
        }
      }
    }

    for (let thumb of sliderThumbElementList) {
      const slider = new Slider(thumb);
      slider.init();
    }

    this.container.append(controlSection);

    const cardsSection: HTMLElement = this.cardsSection.render();
    this.container.append(cardsSection);
    this.bindListeners();
  }

  private createContentCards(filteredData: Array<IData>) {
    const cardsSection: HTMLElement = this.container.querySelector('.cards')!;
    function renderCard(data: Array<IData>): void {
      const cardDataFirstLoad = [...data];
      cardDataFirstLoad.forEach((el) => {
        const cardDivComp = new Component('div', 'card');
        const cardDiv: HTMLElement = cardDivComp.render();
        let cardTemplate: string = SettingsSections.cards;
        Object.entries(el).forEach((key) => {
          const regexp: RegExp = new RegExp(`{{${key[0]}}}`, 'g');
          if (typeof key[1] === 'string')
            cardTemplate = cardTemplate.replace(regexp, key[1]);
          else
            cardTemplate = cardTemplate.replace(
              regexp,
              key[1] === false ? 'Нет' : 'Да'
            );
        });
        cardDiv.innerHTML = cardTemplate;
        cardsSection.append(cardDiv);
      });
    }

    if (!SettingsPage.filter.isChanged) {
      renderCard(data);
    } else {
      cardsSection.innerHTML = '';
      renderCard(filteredData);
    }
  }

  private translateProp(prop: string, lang: string): string {
    let translation: string = '';

    if (lang === 'en') {
      translation = SettingsPage.engLabel[SettingsPage.rusLabel.indexOf(prop)];
    } else {
      translation = SettingsPage.rusLabel[SettingsPage.engLabel.indexOf(prop)];
    }
    return translation || prop;
  }

  private bindListeners() {
    const buttonBlocks = this.container.querySelectorAll('.filter__btns');
    buttonBlocks.forEach((btnBlock) => {
      btnBlock?.addEventListener('click', (e: Event) => {
        SettingsPage.filter.isChanged = true;
        this.handleFilterByValue(e);
      });
    });
    const rangeSlider = this.container.querySelectorAll('.slider');
    rangeSlider.forEach((slider) => {
      slider?.addEventListener('click', (e: Event) => {
        SettingsPage.filter.isChanged = true;
        this.handleFilterByRange(e);
      });
    });
  }

  private handleFilterByValue(e: Event) {
    const buttonDiv = e.currentTarget as HTMLElement;
    const button = e.target as HTMLInputElement;
    // console.log('button', button.checked);
    const dataFilterVal: string | undefined = button.dataset.filter;
    // console.log('dataFilterVal', dataFilterVal);
    if (dataFilterVal) {
      const btnDiv: string = buttonDiv.id.split('-').slice(-1)[0];
      const btnData: string = this.translateProp(dataFilterVal, 'en');
      // console.log('btnDiv, btnData', btnDiv, btnData);
      let levelOneProp = SettingsPage.filter[btnDiv];
      // console.log('levelOneProp', levelOneProp);
      if (typeof levelOneProp === 'object') {
        if (levelOneProp[btnData] === false) {
          levelOneProp[btnData] = true;
        } else {
          levelOneProp[btnData] = false;
        }
      } else {
        // console.log('button.checked', button.checked);
        if (levelOneProp === false) {
          // console.log('before false');
          SettingsPage.filter[btnDiv] = true;
        } else {
          // console.log('before true');
          SettingsPage.filter[btnDiv] = false;
        }
      }
      // console.log('filtered data:', this.filterData(SettingsPage.filter));
      this.createContentCards(this.filterData(SettingsPage.filter));
    }
  }

  private handleFilterByRange(e: Event) {
    //   const rangeDiv = e.currentTarget as HTMLElement;
    //   const thumb = e.target as HTMLElement;
    //   console.log(`rangeDiv`, rangeDiv);
    //   console.log(`thimb`, thumb);
  }

  private filterData(filter: IObj) {
    // console.log(`filter`, filter);
    const shape = typeof filter.shape === 'object' ? filter.shape : {};
    const color = typeof filter.color === 'object' ? filter.color : {};
    const size = typeof filter.size === 'object' ? filter.size : {};
    const favorite =
      typeof filter.favorite === 'boolean' ? filter.favorite : false;

    const filteredData: Array<IData> = [];
    const dataImport: Array<IData> = data.slice();

    dataImport.forEach((el) => {
      // filter shape
      for (let key in shape) {
        if (
          shape[`${key}`] === true &&
          el[`shape`] === this.translateProp(key, 'ru')
        ) {
          filteredData.push(el);
        }
      }
      // filter color
      for (let key in color) {
        if (
          color[key] === true &&
          el['color'] === this.translateProp(key, 'ru')
        ) {
          filteredData.push(el);
        }
      }
      // filter size
      for (let key in size) {
        if (
          size[key] === true &&
          el['size'] === this.translateProp(key, 'ru')
        ) {
          filteredData.push(el);
        }
      }
      // filter favourite
      if (favorite && el['favorite'] === true) {
        filteredData.push(el);
      }
    });
    return this.checkUnique(filteredData);
  }

  private checkUnique(a: Array<IData>) {
    let uniqueSet: Set<IData> = new Set();
    a.forEach((el) => uniqueSet.add(el));
    const uniqueArr: Array<IData> = Array.from(uniqueSet);
    return uniqueArr;
  }

  render() {
    this.createContentControls();
    this.createContentCards([]);
    return this.container;
  }
}

export default SettingsPage;
