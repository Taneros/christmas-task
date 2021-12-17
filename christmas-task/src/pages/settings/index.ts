import { data } from '../../assets/data';
import Component from '../../core/templates/component';
import Page from '../../core/templates/page';
import SettingsSections from '../../core/templates/settings';
import './nouislider.css';
import _default, { target, API } from 'nouislider';
import SearchInput from '../../core/templates/search-input';
const noUiSlider = _default;

//TODO
/**
 * move settings of functions to app > settings.ts
 * move interfaces to app > interfaces.ts
 * move methods to core > utilities.ts
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
  [key: string]: { [key: string]: boolean | number };
}

class SettingsPage extends Page {
  private controlSection: Component;
  private cardsSection: Component;
  private searchBox: Component;

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
    select: { AZ: true, ZA: false, qtyUp: false, qtyDown: false },
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
    this.searchBox = new Component(
      'div',
      'header__search search-container',
      'search-box'
    );
  }

  private createContentControls() {
    // header search searchBox
    const header = document.querySelector('.header') as HTMLElement;
    const searchDiv: HTMLElement = this.searchBox.render();
    searchDiv.innerHTML = SearchInput.searchForm;
    header.append(searchDiv);

    // controls section
    const controlSection: HTMLElement = this.controlSection.render();
    controlSection.innerHTML = SettingsSections.controls;

    // rnge sliders
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
      console.log(`false! >>>`, SettingsPage.filter.isChanged.isChanged);
      renderCard(data);
    } else {
      console.log(
        `true! is isChanged >>>`,
        SettingsPage.filter.isChanged.isChanged
      );
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
    const dropDownSelect = this.container.querySelector('#dropdown-select');
    dropDownSelect?.addEventListener('change', (e: Event) => {
      SettingsPage.filter.isChanged.isChanged = true;
      this.handleFilterByOption(e);
    });
    const searchInput = document.querySelector(
      '#search-box-input'
    ) as HTMLElement;

    const debounce = (callback: { (e: Event): void }, wait: number) => {
      let timeout: ReturnType<typeof setTimeout>;
      return (...args: [e: Event]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          SettingsPage.filter.isChanged.isChanged = true;
          callback.apply(this, args);
        }, wait);
      };
    };

    searchInput.addEventListener(
      'keyup',
      debounce(this.handleFilterBySearchInput, 500)
    );
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

  private handleFilterByOption(e: Event) {
    const selectEl = e.currentTarget as HTMLSelectElement;
    const selectId = selectEl.id.split('-').slice(-1)[0];
    const levelOneProp = SettingsPage.filter[selectId];

    for (let [k, v] of Object.entries(levelOneProp)) {
      if (k === selectEl.value) levelOneProp[k] = true;
      else levelOneProp[k] = false;
    }

    this.createContentCards(this.filterData(SettingsPage.filter));
  }

  private handleFilterBySearchInput(e: Event) {
    // console.log(`e`, e);
    const input = e.target as HTMLInputElement;
    const inputValue = input.value;

    // console.log(`input`, input);
    // console.log(`inputValue`, inputValue);

    this.createContentCards(this.searchItems(inputValue.toLowerCase().trim()));
  }

  private searchItems(input: string) {
    let dataImport: Array<IData> = data.slice();

    const filteredData: Array<IData> = [];
    dataImport.forEach((el) => {
      for (const [key, value] of Object.entries(el)) {
        if (key === 'name' && String(value).includes(input))
          filteredData.push(el);
      }
    });
    console.log(`filteredData`, filteredData);

    if (filteredData.length) {
      dataImport = dataImport.concat(filteredData);
      if (dataImport.length !== filteredData.length) {
        dataImport = dataImport.filter((el, idx) => {
          return dataImport.indexOf(el) !== idx;
        });
      }
    }

    return dataImport;
  }

  private filterData(filter: IObj) {
    // console.log(`filter`, filter.select);
    const qty = typeof filter.count === 'object' ? filter.count : {};
    const year = typeof filter.year === 'object' ? filter.year : {};
    const selectDropDown =
      typeof filter.select === 'object' ? filter.select : {};

    let dataImport: Array<IData> = data.slice();

    for (const [key, value] of Object.entries(filter)) {
      let filteredData: Array<IData> = [];
      for (const [innerKey, innerVal] of Object.entries(value)) {
        if (innerVal === true) {
          filteredData = filteredData.concat(
            dataImport.filter((toy) => {
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

      for (const [innerKey, innerVal] of Object.entries(selectDropDown)) {
        if (innerVal === true && innerKey === 'AZ') {
          console.log(`innerKey innerVal >>>`, innerKey, innerVal);
          dataImport = dataImport.sort(function (a: IData, b: IData): number {
            return String(a.name).charCodeAt(0) - String(b.name).charCodeAt(0);
          });
        } else if (innerVal === true && innerKey === 'ZA') {
          dataImport = dataImport.sort(function (a: IData, b: IData): number {
            return String(b.name).charCodeAt(0) - String(a.name).charCodeAt(0);
          });
        } else if (innerVal === true && innerKey === 'qtyUp') {
          dataImport = dataImport.sort(function (a: IData, b: IData): number {
            return Number(a.count) - Number(b.count);
          });
        } else if (innerVal === true && innerKey === 'qtyDown') {
          dataImport = dataImport.sort(function (a: IData, b: IData): number {
            return Number(b.count) - Number(a.count);
          });
        }
      }

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
