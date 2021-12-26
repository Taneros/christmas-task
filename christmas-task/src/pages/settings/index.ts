import { data } from '../../assets/data';
import Component from '../../core/templates/component';
import Page from '../../core/templates/page';
import SettingsSections from '../../core/templates/settings';
import './nouislider.css';
import _default, { target, API } from 'nouislider';
import * as interfaces from '../../core/interfaces';
import Utils from '../../app/utils';
import { Settings, localStorageNames } from '../../app/settings';
import popUp from '../../core/templates/popup';

//TODO
/**
 * move settings of functions to app > settings.ts
 * move search filter methods to core > utilities.ts
 *
 * create components names.ts
 *  class returns names, tags, ids, classes of components
 *
 * create basket:
 *  - overlay trigger with basket items on basket btn click
 *  - add shaking style for more than 20
 *  - add modal overlay to show all items in basket
 *
 *
 * save to local storage
 *  - get array of elements and store it after certain intervals in
 *  -
 *
 *  Card:
 *
 *  - change active class to in-basket
 *
 *  Search Box:
 *
 *  - fix cross does not restart cards create
 *
 **/

class SettingsPage extends Page {
  private controlSection: Component;
  private cardsSection: Component;
  private static filter = new Settings().filter;
  private popup: Component;
  private static isRestoredLSData: boolean = false;
  private static sliderQty: API;
  private static sliderYear: API;

  private static basketItems = new Settings().basketItems;

  constructor(id: string, className: string) {
    super(id, className);
    this.controlSection = new Component('section', 'controls');
    this.cardsSection = new Component('section', 'cards');
    this.popup = new Component('div', 'popup', 'popup');
  }

  private createContentControls() {
    // controls section
    const controlSection: HTMLElement = this.controlSection.render();
    controlSection.innerHTML = SettingsSections.controls;

    const noUiSlider = _default;

    // range sliders
    const sliderDivQty = <target>(
      controlSection.querySelector('#slider-count-count')
    );

    const sliderDivYear = <target>(
      controlSection.querySelector('#slider-count-year')
    );

    SettingsPage.sliderQty = noUiSlider.create(
      sliderDivQty,
      Settings.sliderQtySettings
    );
    SettingsPage.sliderYear = noUiSlider.create(
      sliderDivYear,
      Settings.sliderYearSettings
    );

    SettingsPage.sliderQty.on('update', function (values) {
      const outputQtyMin = sliderDivQty.previousElementSibling as HTMLElement;
      outputQtyMin.innerHTML = String(parseInt(<string>values[0]));
      const outputQtyMax = sliderDivQty.nextElementSibling as HTMLElement;
      outputQtyMax.innerHTML = String(parseInt(<string>values[1]));
    });

    SettingsPage.sliderYear.on('update', function (values) {
      const outputQtyMin = sliderDivYear.previousElementSibling as HTMLElement;
      outputQtyMin.innerHTML = String(parseInt(<string>values[0]));
      const outputQtyMax = sliderDivYear.nextElementSibling as HTMLElement;
      outputQtyMax.innerHTML = String(parseInt(<string>values[1]));
    });

    this.container.prepend(controlSection);
  }

  private createNotFoundMsg() {
    const cardsSections: HTMLElement = this.cardsSection.render();
    cardsSections.innerHTML = '';
    const msgDiv: HTMLElement = new Component('div', 'notfound').render();
    msgDiv.innerHTML = 'По запросу ничего не найдено!';
    cardsSections.append(msgDiv);
  }

  private createContentCards(filteredData: Array<interfaces.IData>) {
    const cardsSections: HTMLElement = this.cardsSection.render();
    this.container.append(cardsSections);

    const renderCard = (d: Array<interfaces.IData> = data): void => {
      const cardData = [...d];
      cardData.forEach((el) => {
        const cardDiv: HTMLElement = new Component('div', 'card').render();
        let cardTemplate: string = SettingsSections.cards;
        Object.entries(el).forEach((key) => {
          const regexp: RegExp = new RegExp(`{{${key[0]}}}`, 'g');
          if (typeof key[1] === 'string') {
            cardTemplate = cardTemplate.replace(regexp, key[1]);
          } else {
            cardTemplate = cardTemplate.replace(
              regexp,
              key[1] === false ? 'Нет' : 'Да'
            );
          }
          if (
            key[0] === 'num' &&
            SettingsPage.basketItems.items[Number(key[1])]
          ) {
            cardDiv.classList.toggle('active');
          }
        });
        cardDiv.innerHTML = cardTemplate;
        cardDiv.addEventListener('click', (e: Event) => {
          this.handleCardClick(e);
        });
        cardsSections.append(cardDiv);
      });
    };
    if (!SettingsPage.filter.isChanged.isChanged) {
      cardsSections.innerHTML = '';
      renderCard(data);
    } else {
      cardsSections.innerHTML = '';
      renderCard(filteredData);
    }
  }

  private restoreFiltersState(): void {
    //TODO
    /**
     * Refactor:
     *
     *   - loop on filter object instead of individual objects
     *
     **/

    // restore data from LS
    if (Settings.getLocalStorageControls(localStorageNames.filter)) {
      SettingsPage.filter = Object(
        Settings.getLocalStorageControls(localStorageNames.filter)
      );

      const shapeBtns = SettingsPage.filter.shape;
      const colorBtns = SettingsPage.filter.color;
      const sizeBtns = SettingsPage.filter.size;
      const favBtn = SettingsPage.filter.favorite;
      const rangeQty = SettingsPage.filter.count;
      const rangeYear = SettingsPage.filter.year;
      const select = SettingsPage.filter.select;

      // shape
      for (const [innerKey, innerVal] of Object.entries(shapeBtns)) {
        if (innerVal === true) {
          let event: Event = new Event('click', { bubbles: true });
          const btnsBlock = <HTMLElement>(
            this.container.querySelector(`#filter-by-shape`)
          );
          const btn = <HTMLElement>(
            btnsBlock.querySelector(`#shape-${innerKey}`)
          );
          SettingsPage.isRestoredLSData = true;
          btn.dispatchEvent(event);
        }
      }
      // color
      for (const [innerKey, innerVal] of Object.entries(colorBtns)) {
        if (innerVal === true) {
          let event: Event = new Event('click', { bubbles: true });
          const btnsBlock = <HTMLElement>(
            this.container.querySelector(`#filter-by-color`)
          );
          const btn = <HTMLElement>(
            btnsBlock.querySelector(`#color-${innerKey}`)
          );
          SettingsPage.isRestoredLSData = true;
          btn.dispatchEvent(event);
        }
      }
      // size
      for (const [innerKey, innerVal] of Object.entries(sizeBtns)) {
        if (innerVal === true) {
          let event: Event = new Event('click', { bubbles: true });
          const btnsBlock = <HTMLElement>(
            this.container.querySelector(`#filter-by-size`)
          );
          const btn = <HTMLElement>btnsBlock.querySelector(`#size-${innerKey}`);
          SettingsPage.isRestoredLSData = true;
          btn.dispatchEvent(event);
        }
      }
      // favorite
      for (const [innerKey, innerVal] of Object.entries(favBtn)) {
        if (innerVal === true) {
          let event: Event = new Event('click', { bubbles: true });
          const btnsBlock = <HTMLElement>(
            this.container.querySelector(`#filter-by-favorite`)
          );
          const btn = <HTMLInputElement>(
            btnsBlock.querySelector(`#favorite-${innerKey}`)
          );
          btn.checked = true;
          SettingsPage.isRestoredLSData = true;
          btn.dispatchEvent(event);
        }
      }

      // range by qty
      SettingsPage.sliderQty.set([
        <number>rangeQty.start,
        <number>rangeQty.end,
      ]);
      const rangeRailQty = <HTMLElement>(
        this.container.querySelector('#slider-count-count')
      );
      const eventQty: Event = new Event('click', { bubbles: true });
      SettingsPage.isRestoredLSData = true;
      rangeRailQty.dispatchEvent(eventQty);
      // }

      // range by year
      SettingsPage.sliderYear.set([
        <number>rangeYear.start,
        <number>rangeYear.end,
      ]);
      const rangeRailYear = <HTMLElement>(
        this.container.querySelector('#slider-count-year')
      );
      const eventYear: Event = new Event('click', { bubbles: true });
      SettingsPage.isRestoredLSData = true;
      rangeRailYear.dispatchEvent(eventYear);
      // }

      // select
      for (const [key, val] of Object.entries(select)) {
        if (val === true) {
          const selectEl = <HTMLSelectElement>(
            this.container.querySelector(`#dropdown-select`)
          );
          selectEl.value = key;
          const event: Event = new Event('change', { bubbles: true });
          SettingsPage.isRestoredLSData = true;
          selectEl.dispatchEvent(event);
        }
      }
    }
  }

  private restoreBasketState(): void {
    // restore data from LS
    const basketNumBadge: Element = document.querySelector('.basket__badge')!;
    if (Settings.getLocalStorageControls(localStorageNames.basket)) {
      SettingsPage.basketItems = Object(
        Settings.getLocalStorageControls(localStorageNames.basket)
      );
      basketNumBadge.innerHTML = String(
        Utils.arrayLength(SettingsPage.basketItems.items)
      );
    } else {
      basketNumBadge.innerHTML = String(
        Utils.arrayLength(SettingsPage.basketItems.items)
      );
    }
  }

  private bindListeners(): void {
    // Buttons
    const buttonBlocks = this.container.querySelectorAll('.filter__btns');
    buttonBlocks.forEach((btnBlock) => {
      btnBlock?.addEventListener('click', (e: Event) => {
        SettingsPage.filter.isChanged.isChanged = true;
        this.handleFilterByValue(e);
      });
    });
    // Range sliders
    const rangeSlider = this.container.querySelectorAll('.slider__rail');
    rangeSlider.forEach((slider) => {
      slider?.addEventListener('click', (e: Event) => {
        SettingsPage.filter.isChanged.isChanged = true;
        this.handleFilterByRange(e);
      });
    });
    // Dropdown select search
    const dropDownSelect = this.container.querySelector('#dropdown-select');
    dropDownSelect?.addEventListener('change', (e: Event) => {
      SettingsPage.filter.isChanged.isChanged = true;
      this.handleFilterByOption(e);
    });

    //TODO
    /**
     * move this code to where element is created and attaach event there
     **/

    // Search Box
    const searchInput = document.querySelector(
      '#search-box-input'
    ) as HTMLElement;

    const throttleSearch = (callback: { (e: Event): void }, wait: number) => {
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
      'input',
      throttleSearch(this.handleFilterBySearchInput, 500)
    );

    // Basket

    // Reset buttons
    const resetFiltersButtons: HTMLCollectionOf<Element> =
      this.container.getElementsByClassName('btn controls_reset');

    const myArr: Element[] = Array.from(resetFiltersButtons);

    for (const el of myArr) {
      el?.addEventListener('click', (e: Event) => {
        if (el.id === 'reset-filters') {
          SettingsPage.filter = new Settings().filter;
          const controlsSection = this.container.querySelector(
            '.controls'
          ) as HTMLElement;
          controlsSection.innerHTML = '';
          this.createContentControls();
          this.bindListeners();
        } else if (el.id === 'reset-localstorage') {
          SettingsPage.filter = new Settings().filter;
          SettingsPage.basketItems = new Settings().basketItems;
          localStorage.clear();
          this.render();
        }
      });
    }

    // save settings to local storage every 3 sec
    Utils.delayAction([
      () =>
        Settings.setLocalStorageControls(
          localStorageNames.filter,
          SettingsPage.filter
        ),
      () =>
        Settings.setLocalStorageControls(
          localStorageNames.basket,
          SettingsPage.basketItems
        ),
    ]);
  }

  private handleCardClick(e: Event): void {
    // get array of items
    let basketItems = SettingsPage.basketItems.items;
    const cardDiv = <HTMLElement>e.currentTarget;
    const cardImg = <HTMLElement>cardDiv.querySelector('.card__img');
    const cardImgNum = Number(
      cardImg.getAttribute('src')?.split('/').slice(-1)[0].split('.')[0]
    );

    // console.log(`cardImgNum`, cardImgNum);

    const removePopup = (wait: number) => {
      return new Promise<void>((res) => {
        setTimeout(() => {
          res();
        }, wait);
      });
    };

    const basketNumBadge: HTMLElement =
      document.querySelector('.basket__badge')!;

    if (!basketItems[cardImgNum]) {
      // check [] less < 21
      if (Utils.arrayLength(basketItems) < Settings.basketMaxToys) {
        cardDiv.classList.toggle('active');
        // store qty in basket array under index of img
        basketItems[cardImgNum] = Number(
          Utils.searchDataByKey(
            interfaces.EDataKeys.num,
            String(cardImgNum),
            interfaces.EDataKeys.count
          )
        );
      } else {
        const popUpMax = this.popup.render();
        popUpMax.innerHTML = popUp.basketMax;
        cardDiv.append(popUpMax);
        popUpMax.classList.add('show');

        removePopup(
          Number(
            getComputedStyle(popUpMax)
              .getPropertyValue('--timeout')
              .trim()
              .slice(0, 3)
          ) * 1100
        ).then(() => {
          popUpMax.remove();
        });
      }
    } else {
      // not unique
      // remove element from array
      basketItems[cardImgNum] = 0;
      cardDiv.classList.toggle('active');

      console.log(
        `SettingsPage.basketItems.item`,
        SettingsPage.basketItems.items
      );
    }
    basketNumBadge.innerHTML = String(Utils.arrayLength(basketItems));
  }

  private handleFilterByValue(e: Event): void {
    // console.log(`handleFilterByValue e`, e);
    const buttonDiv = e.currentTarget as HTMLElement;
    const button = e.target as HTMLInputElement;
    const dataFilterVal: string | undefined = button.dataset.filter;
    if (dataFilterVal) {
      const btnDiv: string = buttonDiv.id.split('-').slice(-1)[0];
      const btnData: string = dataFilterVal;
      let levelOneProp = SettingsPage.filter[btnDiv];

      if (!SettingsPage.isRestoredLSData) {
        if (levelOneProp[btnData] === false) {
          levelOneProp[btnData] = true;
          button.classList.add('active');
        } else {
          levelOneProp[btnData] = false;
          button.classList.remove('active');
        }
      } else {
        button.classList.toggle('active');
        SettingsPage.isRestoredLSData = false;
      }
      this.createContentCards(Utils.filterData(SettingsPage.filter));
    }
  }

  private handleFilterByRange(e: Event): void {
    SettingsPage.isRestoredLSData = false;
    const sliderRail = e.currentTarget as HTMLElement;
    const sliderRailId = sliderRail.id.split('-').slice(-1)[0];
    const outputQtyMinVal = Number(
      sliderRail.previousElementSibling?.innerHTML
    );
    const outputQtyMaxVal = Number(sliderRail.nextElementSibling?.innerHTML);
    const levelOneProp = SettingsPage.filter[sliderRailId];
    levelOneProp.start = outputQtyMinVal;
    levelOneProp.end = outputQtyMaxVal;
    this.createContentCards(Utils.filterData(SettingsPage.filter));
  }

  private handleFilterByOption(e: Event): void {
    SettingsPage.isRestoredLSData = false;
    const selectEl = e.currentTarget as HTMLSelectElement;
    const selectId = selectEl.id.split('-').slice(-1)[0];
    const levelOneProp = SettingsPage.filter[selectId];
    for (let [k, v] of Object.entries(levelOneProp)) {
      if (k === selectEl.value) levelOneProp[k] = true;
      else levelOneProp[k] = false;
    }

    this.createContentCards(Utils.filterData(SettingsPage.filter));
  }

  private handleFilterBySearchInput(e: Event): void {
    const input = e.target as HTMLInputElement;
    const inputValue = input.value;
    if (Utils.searchItems(inputValue.toLowerCase().trim()).length > 0)
      this.createContentCards(
        Utils.searchItems(inputValue.toLowerCase().trim())
      );
    else this.createNotFoundMsg();
  }

  render(): HTMLElement {
    this.restoreBasketState();
    this.createContentControls();
    this.createContentCards([]);
    this.bindListeners();
    this.restoreFiltersState();
    return this.container;
  }
}

export default SettingsPage;
