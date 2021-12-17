import { data } from '../../assets/data';
import Component from '../../core/templates/component';
import Page from '../../core/templates/page';
import SettingsSections from '../../core/templates/settings';
import './nouislider.css';
import _default, { target, API } from 'nouislider';
const noUiSlider = _default;
import * as interfaces from '../../core/interfaces';
import Utils from '../../app/utils';

//TODO
/**
 * move settings of functions to app > settings.ts
 * move search filter methods to core > utilities.ts
 *
 * create components names.ts
 *  class returns names, tags, ids, classes of components
 *
 **/

class SettingsPage extends Page {
  private controlSection: Component;
  private cardsSection: Component;

  private static filter: interfaces.IObj = {
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

  constructor(id: string, className: string) {
    super(id, className);
    this.controlSection = new Component('section', 'controls');
    this.cardsSection = new Component('section', 'cards');
  }

  private createContentControls() {
    // controls section
    const controlSection: HTMLElement = this.controlSection.render();
    controlSection.innerHTML = SettingsSections.controls;

    // range sliders
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

  private createContentCards(filteredData: Array<interfaces.IData>) {
    const cardsSection: HTMLElement = this.container.querySelector('.cards')!;

    function renderCard(data: Array<interfaces.IData>): void {
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
      // console.log(
      //   `true! is isChanged >>>`,
      //   SettingsPage.filter.isChanged.isChanged
      // );
      cardsSection.innerHTML = '';
      renderCard(filteredData);
    }
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
      this.createContentCards(Utils.filterData(SettingsPage.filter));
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

    this.createContentCards(Utils.filterData(SettingsPage.filter));
  }

  private handleFilterByOption(e: Event) {
    const selectEl = e.currentTarget as HTMLSelectElement;
    const selectId = selectEl.id.split('-').slice(-1)[0];
    const levelOneProp = SettingsPage.filter[selectId];
    for (let [k, v] of Object.entries(levelOneProp)) {
      if (k === selectEl.value) levelOneProp[k] = true;
      else levelOneProp[k] = false;
    }

    this.createContentCards(Utils.filterData(SettingsPage.filter));
  }

  private handleFilterBySearchInput(e: Event) {
    // console.log(`e`, e);
    const input = e.target as HTMLInputElement;
    const inputValue = input.value;
    // console.log(`input`, input);
    // console.log(`inputValue`, inputValue);
    this.createContentCards(Utils.searchItems(inputValue.toLowerCase().trim()));
  }

  render() {
    this.createContentControls();
    this.createContentCards([]);
    return this.container;
  }
}

export default SettingsPage;
