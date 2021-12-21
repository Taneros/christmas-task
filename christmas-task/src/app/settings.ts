//TODO
/**
 * move settings here
 *
 * store control settings here
 *
 * untilities ts
 *
 *   can store and retreve from local storage
 *
 *
 *
 **/

import * as interfaces from '../core/interfaces';

const enum localStorageNames {
  filter = 'filter',
  basket = 'basket',
}

class Settings {
  static sliderYearSettings = {
    start: [1940, 2020],
    connect: true,
    range: {
      min: 1940,
      max: 2020,
    },
    step: 10,
  };

  static sliderQtySettings = {
    start: [1, 12],
    connect: true,
    range: {
      min: 1,
      max: 12,
    },
    step: 1,
  };

  filter: interfaces.IObj = {
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
    select: { AZ: false, ZA: false, qtyUp: false, qtyDown: false },
    isChanged: { isChanged: false },
  };

  //TODO
  /**
   * add array type Array<type of boolean | number> to basketItems
   **/

  basketItems: interfaces.basket = {
    items: [],
  };

  static basketMaxToys: number = 20;

  static setLocalStorageControls(
    data_name: localStorageNames,
    data: object | []
  ): void {
    localStorage.setItem(data_name, JSON.stringify(data));
  }

  static getLocalStorageControls(data: localStorageNames): string | boolean {
    if (localStorage.getItem(data)) {
      return JSON.parse(String(localStorage.getItem(data)));
    }
    return false;
  }
}

export { Settings, localStorageNames };
