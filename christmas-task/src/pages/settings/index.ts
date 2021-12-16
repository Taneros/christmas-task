import { data } from '../../assets/data';
import Component from '../../core/templates/component';
import Page from '../../core/templates/page';
import SettingsSections from '../../core/templates/settings';
import './nouislider.css';
import _default, { target, API } from 'nouislider';
const noUiSlider = _default;

//TODO
/**
 * filter by range
 *
 * filter by
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
  [key: string]: { [key: string]: boolean | number };
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
    favorite: { favorite: false },
    isChanged: { isChanged: false },
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
    const sliderDivQty = <target>(
      controlSection.querySelector('#slider-count-count')
    );

    const sliderQtySettings = {
      start: [1, 12],
      connect: true,
      range: {
        min: 1,
        max: 12,
      },
      step: 1,
    };

    const sliderDivYear = <target>(
      controlSection.querySelector('#slider-count-year')
    );

    const sliderYearSettings = {
      start: [1960, 2020],
      connect: true,
      range: {
        min: 1960,
        max: 2020,
      },
      step: 10,
    };

    const sliders = [
      { slider_1: sliderDivQty, sliderQtySettings },
      { slider_2: sliderDivYear, sliderQtySettings },
    ];

    const sliderQty = noUiSlider.create(sliderDivQty, sliderQtySettings);
    const sliderYear = noUiSlider.create(sliderDivYear, sliderYearSettings);

    (<API>sliderQty).on('update', function (values) {
      const outputQtyMin = sliderDivQty.previousElementSibling as HTMLElement;
      outputQtyMin.innerHTML = String(parseInt(<string>values[0]));
      const outputQtyMax = sliderDivQty.nextElementSibling as HTMLElement;
      outputQtyMax.innerHTML = String(parseInt(<string>values[1]));
    });

    (<API>sliderYear).on('update', function (values) {
      const outputQtyMin = sliderDivYear.previousElementSibling as HTMLElement;
      outputQtyMin.innerHTML = String(parseInt(<string>values[0]));
      const outputQtyMax = sliderDivYear.nextElementSibling as HTMLElement;
      outputQtyMax.innerHTML = String(parseInt(<string>values[1]));
    });

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

    if (!SettingsPage.filter.isChanged.isChanged) {
      // console.log(`false! >>>`, SettingsPage.filter.isChanged.isChanged);
      renderCard(data);
    } else {
      // console.log(`true! >>>`, SettingsPage.filter.isChanged.isChanged);
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
        SettingsPage.filter.isChanged.isChanged = true;
        this.handleFilterByValue(e);
      });
    });
    const rangeSlider = this.container.querySelectorAll('.slider__rail');
    rangeSlider.forEach((slider) => {
      slider?.addEventListener('click', (e: Event) => {
        SettingsPage.filter.isChanged.isChanged = true;
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
      const btnData: string = dataFilterVal;
      // console.log('btnDiv, btnData', btnDiv, btnData);
      let levelOneProp = SettingsPage.filter[btnDiv];
      // console.log('levelOneProp', levelOneProp);

      if (levelOneProp[btnData] === false) {
        levelOneProp[btnData] = true;
        button.classList.add('active');
      } else {
        levelOneProp[btnData] = false;
        button.classList.remove('active');
      }
      // console.log('filtered data:', this.filterData(SettingsPage.filter));
      this.createContentCards(this.filterData(SettingsPage.filter));
    }
  }

  private handleFilterByRange(e: Event) {
    const sliderRail = e.currentTarget as HTMLElement;
    const sliderRailId = sliderRail.id.split('-').slice(-1)[0];
    console.log(`rail id`, sliderRailId);
    const outputQtyMinVal = Number(
      sliderRail.previousElementSibling?.innerHTML
    );
    const outputQtyMaxVal = Number(sliderRail.nextElementSibling?.innerHTML);
    const levelOneProp = SettingsPage.filter[sliderRailId];
    levelOneProp.start = outputQtyMinVal;
    levelOneProp.end = outputQtyMaxVal;

    this.createContentCards(this.filterData(SettingsPage.filter));
  }

  private filterData(filter: IObj) {
    console.log(`filter`, filter);
    const qty = typeof filter.count === 'object' ? filter.count : {};
    const year = typeof filter.year === 'object' ? filter.year : {};

    let dataImport: Array<IData> = data.slice();

    for (const [key, value] of Object.entries(filter)) {
      let filteredData: Array<IData> = [];
      for (const [innerKey, innerVal] of Object.entries(value)) {
        if (innerVal === true) {
          // console.log(`k v true >>>`, innerKey, innerVal);
          filteredData = filteredData.concat(
            dataImport.filter((toy) => {
              // console.log(
              //   `this.translateProp(k, 'ru') >>>`,
              //   this.translateProp(innerKey, 'ru')
              // );
              return (
                toy[`${key}`] ===
                (this.translateProp(innerKey, 'ru') === innerKey
                  ? innerVal
                  : this.translateProp(innerKey, 'ru'))
              );
            })
          );
        }
      }
      // filter by range qty
      dataImport = dataImport.filter((el, idx) => {
        for (let key in qty) {
          if (
            key === 'start' &&
            parseInt(el['count'] as string) >= <number>qty[key] &&
            parseInt(el['count'] as string) <= <number>qty['end']
          ) {
            return el;
          } else if (
            key === 'end' &&
            parseInt(el['count'] as string) >= <number>qty[key] &&
            parseInt(el['count'] as string) <= <number>qty['start']
          ) {
            return el;
          }
        }
      });

      // filter by range year
      dataImport = dataImport.filter((el, idx) => {
        for (let key in year) {
          if (
            key === 'start' &&
            parseInt(el['year'] as string) >= <number>year[key] &&
            parseInt(el['year'] as string) <= <number>year['end']
          ) {
            return el;
          } else if (
            key === 'end' &&
            parseInt(el['year'] as string) >= <number>year[key] &&
            parseInt(el['year'] as string) <= <number>year['start']
          ) {
            return el;
          }
        }
      });

      console.log(`filteredData.length`, filteredData.length);

      if (filteredData.length) {
        dataImport = dataImport.concat(filteredData);
        if (dataImport.length !== filteredData.length) {
          dataImport = dataImport.filter((el, idx) => {
            return dataImport.indexOf(el) !== idx;
          });
        }
      }
    }

    return dataImport;
  }

  render() {
    this.createContentControls();
    this.createContentCards([]);
    return this.container;
  }
}

export default SettingsPage;
